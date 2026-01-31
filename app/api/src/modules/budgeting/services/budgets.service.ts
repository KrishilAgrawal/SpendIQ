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
    return this.prisma.budget.findMany({
      where: {
        status: status ? status : undefined,
        departmentId: departmentId ? departmentId : undefined,
        // Only fetch latest versions (nextVersion is null) if we want current active budgets
        nextVersion: null,
      },
      include: { department: true },
      orderBy: { createdAt: "desc" },
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
