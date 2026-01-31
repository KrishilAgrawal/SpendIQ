import { AutoAnalyticalService } from "../services/auto-analytical.service";
export declare class AutoAnalyticalRulesController {
    private readonly service;
    constructor(service: AutoAnalyticalService);
    create(body: any): Promise<{
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
}
