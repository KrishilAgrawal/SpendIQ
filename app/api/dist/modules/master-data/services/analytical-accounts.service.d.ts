import { PrismaService } from "../../../common/database/prisma.service";
import { CreateAnalyticalAccountDto } from "../dto/create-analytical-account.dto";
export declare class AnalyticalAccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAnalyticalAccountDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        parentId: string | null;
    }>;
    findAll(): Promise<({
        parent: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        parentId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        parent: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            parentId: string | null;
        }[];
        budgets: {
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
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        parentId: string | null;
    }>;
    getTree(): Promise<({
        parent: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            code: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        parentId: string | null;
    })[]>;
}
