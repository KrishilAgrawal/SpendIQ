"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/database/prisma.service");
const client_1 = require("@prisma/client");
let BudgetsService = class BudgetsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        return this.prisma.budget.create({
            data: {
                name: dto.name,
                fiscalYear: dto.fiscalYear,
                departmentId: dto.departmentId,
                createdBy: userId,
                status: client_1.BudgetStatus.DRAFT,
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
    async findAll(status, departmentId) {
        return this.prisma.budget.findMany({
            where: {
                status: status ? status : undefined,
                departmentId: departmentId ? departmentId : undefined,
                nextVersion: null,
            },
            include: { department: true },
            orderBy: { createdAt: "desc" },
        });
    }
    async findOne(id) {
        const budget = await this.prisma.budget.findUnique({
            where: { id },
            include: {
                lines: { include: { product: true } },
                department: true,
                previousVersion: true,
                nextVersion: true,
            },
        });
        if (!budget)
            throw new common_1.NotFoundException("Budget not found");
        return budget;
    }
    async approve(id) {
        return this.prisma.budget.update({
            where: { id },
            data: { status: client_1.BudgetStatus.APPROVED },
        });
    }
    async createRevision(id, userId, dto) {
        const oldBudget = await this.findOne(id);
        if (oldBudget.status !== client_1.BudgetStatus.APPROVED) {
            throw new common_1.BadRequestException("Can only revise approved budgets. Edit the draft directly.");
        }
        return this.prisma.$transaction(async (tx) => {
            const newBudget = await tx.budget.create({
                data: {
                    name: dto.name,
                    fiscalYear: dto.fiscalYear,
                    departmentId: dto.departmentId,
                    createdBy: userId,
                    status: client_1.BudgetStatus.DRAFT,
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
            return newBudget;
        });
    }
};
exports.BudgetsService = BudgetsService;
exports.BudgetsService = BudgetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BudgetsService);
//# sourceMappingURL=budgets.service.js.map