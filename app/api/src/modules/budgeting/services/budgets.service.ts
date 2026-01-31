import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../../common/database/prisma.service";
import { CreateBudgetDto } from "../dto/create-budget.dto";
import { BudgetStatus } from "@prisma/client";

@Injectable()
export class BudgetsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBudgetDto) {
    return this.prisma.budget.create({
      data: {
        name: dto.name,
        fiscalYear: dto.fiscalYear,
        departmentId: dto.departmentId,
        createdBy: userId,
        status: BudgetStatus.DRAFT,
        lines: {
          create: dto.lines.map((line) => ({
            productId: line.productId,
            description: line.description,
            plannedAmount: line.plannedAmount,
          })),
        },
      },
      include: { lines: true },
    });
  }

  async findAll(status?: BudgetStatus, departmentId?: string) {
    const budgets = await this.prisma.budget.findMany({
      where: {
        status: status ? status : undefined,
        departmentId: departmentId ? departmentId : undefined,
        // Only fetch latest versions (nextVersion is null) if we want current active budgets
        nextVersion: null,
      },
      include: {
        department: true,
        lines: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Transform budgets to include calculated fields
    return budgets.map((budget) => {
      const allocated = budget.lines.reduce(
        (sum, line) => sum + Number(line.plannedAmount),
        0,
      );
      // TODO: Calculate actual spent from transactions/journal entries
      const spent = 0; // Placeholder - implement when transaction tracking is ready

      return {
        ...budget,
        allocated,
        spent,
        department: budget.department?.name || null,
      };
    });
  }

  async findOne(id: string) {
    const budget = await this.prisma.budget.findUnique({
      where: { id },
      include: {
        lines: { include: { product: true } },
        department: true,
        previousVersion: true,
        nextVersion: true,
      },
    });
    if (!budget) throw new NotFoundException("Budget not found");
    return budget;
  }

  async approve(id: string) {
    // Audit log could be triggered here
    return this.prisma.budget.update({
      where: { id },
      data: { status: BudgetStatus.APPROVED },
    });
  }

  // Update an existing draft budget
  async update(id: string, dto: CreateBudgetDto) {
    const existingBudget = await this.findOne(id);

    if (existingBudget.status !== BudgetStatus.DRAFT) {
      throw new BadRequestException(
        "Can only update draft budgets. Use revise endpoint for approved budgets.",
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // Delete existing lines
      await tx.budgetLine.deleteMany({
        where: { budgetId: id },
      });

      // Update budget with new data and lines
      return tx.budget.update({
        where: { id },
        data: {
          name: dto.name,
          fiscalYear: dto.fiscalYear,
          departmentId: dto.departmentId,
          lines: {
            create: dto.lines.map((line) => ({
              productId: line.productId,
              description: line.description,
              plannedAmount: line.plannedAmount,
            })),
          },
        },
        include: { lines: true },
      });
    });
  }

  // Create a new version of an existing budget
  async createRevision(id: string, userId: string, dto: CreateBudgetDto) {
    const oldBudget = await this.findOne(id);

    if (oldBudget.status !== BudgetStatus.APPROVED) {
      throw new BadRequestException(
        "Can only revise approved budgets. Edit the draft directly.",
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Create new budget version
      const newBudget = await tx.budget.create({
        data: {
          name: dto.name,
          fiscalYear: dto.fiscalYear,
          departmentId: dto.departmentId,
          createdBy: userId,
          status: BudgetStatus.DRAFT,
          version: oldBudget.version + 1,
          previousVersionId: oldBudget.id,
          lines: {
            create: dto.lines.map((line) => ({
              productId: line.productId,
              description: line.description,
              plannedAmount: line.plannedAmount,
            })),
          },
        },
      });

      // 2. Mark old budget as archived (or just leave it as history?)
      // Actually standard practice is to keep it APPROVED until new one is APPROVED.
      // But typically "Active" flag might be better.
      // For now, we rely on `nextVersion` relation to find the head.

      return newBudget;
    });
  }
}
