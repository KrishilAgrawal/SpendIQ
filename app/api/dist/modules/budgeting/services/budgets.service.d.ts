import { PrismaService } from "../../../common/database/prisma.service";
import { CreateBudgetDto } from "../dto/create-budget.dto";
import { BudgetStatus } from "@prisma/client";
export declare class BudgetsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateBudgetDto): Promise<{
        lines: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            plannedAmount: import("@prisma/client/runtime/library").Decimal;
            productId: string | null;
            budgetId: string;
        }[];
    } & {
        id: string;
        name: string;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }>;
    findAll(status?: BudgetStatus, departmentId?: string): Promise<{
        allocated: number;
        spent: number;
        department: string;
        lines: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            plannedAmount: import("@prisma/client/runtime/library").Decimal;
            productId: string | null;
            budgetId: string;
        }[];
        id: string;
        name: string;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }[]>;
    findOne(id: string): Promise<{
        department: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            parentId: string | null;
        };
        previousVersion: {
            id: string;
            name: string;
            fiscalYear: number;
            status: import(".prisma/client").$Enums.BudgetStatus;
            version: number;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string | null;
            previousVersionId: string | null;
            createdBy: string;
        };
        nextVersion: {
            id: string;
            name: string;
            fiscalYear: number;
            status: import(".prisma/client").$Enums.BudgetStatus;
            version: number;
            createdAt: Date;
            updatedAt: Date;
            departmentId: string | null;
            previousVersionId: string | null;
            createdBy: string;
        };
        lines: ({
            product: {
                id: string;
                name: string;
                description: string | null;
                code: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                cost: import("@prisma/client/runtime/library").Decimal;
                type: import(".prisma/client").$Enums.ProductType;
                categoryId: string | null;
                defaultAnalyticAccountId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            plannedAmount: import("@prisma/client/runtime/library").Decimal;
            productId: string | null;
            budgetId: string;
        })[];
    } & {
        id: string;
        name: string;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }>;
    approve(id: string): Promise<{
        id: string;
        name: string;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }>;
    update(id: string, dto: CreateBudgetDto): Promise<{
        lines: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            plannedAmount: import("@prisma/client/runtime/library").Decimal;
            productId: string | null;
            budgetId: string;
        }[];
    } & {
        id: string;
        name: string;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }>;
    createRevision(id: string, userId: string, dto: CreateBudgetDto): Promise<{
        id: string;
        name: string;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        createdAt: Date;
        updatedAt: Date;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }>;
}
