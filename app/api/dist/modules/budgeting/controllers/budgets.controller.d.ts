import { BudgetsService } from "../services/budgets.service";
import { CreateBudgetDto } from "../dto/create-budget.dto";
import { BudgetStatus } from "@prisma/client";
export declare class BudgetsController {
    private readonly budgetsService;
    constructor(budgetsService: BudgetsService);
    create(req: any, dto: CreateBudgetDto): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }>;
    revise(req: any, id: string, dto: CreateBudgetDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }>;
    approve(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }>;
    findAll(status?: BudgetStatus, departmentId?: string): Promise<({
        department: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            parentId: string | null;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    })[]>;
    findOne(id: string): Promise<{
        lines: ({
            product: {
                id: string;
                name: string;
                code: string | null;
                type: import(".prisma/client").$Enums.ProductType;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                cost: import("@prisma/client/runtime/library").Decimal;
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
            createdAt: Date;
            updatedAt: Date;
            fiscalYear: number;
            status: import(".prisma/client").$Enums.BudgetStatus;
            version: number;
            departmentId: string | null;
            previousVersionId: string | null;
            createdBy: string;
        };
        nextVersion: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            fiscalYear: number;
            status: import(".prisma/client").$Enums.BudgetStatus;
            version: number;
            departmentId: string | null;
            previousVersionId: string | null;
            createdBy: string;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        fiscalYear: number;
        status: import(".prisma/client").$Enums.BudgetStatus;
        version: number;
        departmentId: string | null;
        previousVersionId: string | null;
        createdBy: string;
    }>;
}
