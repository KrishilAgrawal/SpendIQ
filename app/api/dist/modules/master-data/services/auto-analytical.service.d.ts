import { PrismaService } from "../../../common/database/prisma.service";
export interface RuleContext {
    vendorId?: string;
    productCategoryId?: string;
    description?: string;
    accountId?: string;
}
export declare class AutoAnalyticalService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAnalyticAccount(context: RuleContext): Promise<string | null>;
    create(data: any): Promise<{
        conditions: {
            id: string;
            value: string;
            field: import(".prisma/client").$Enums.RuleField;
            operator: import(".prisma/client").$Enums.RuleOperator;
            ruleId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        targetAccountId: string;
        active: boolean;
    }>;
    findAll(): Promise<({
        conditions: {
            id: string;
            value: string;
            field: import(".prisma/client").$Enums.RuleField;
            operator: import(".prisma/client").$Enums.RuleOperator;
            ruleId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        targetAccountId: string;
        active: boolean;
    })[]>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        priority: number;
        targetAccountId: string;
        active: boolean;
    }>;
    private matchesRule;
    private evaluateCondition;
}
