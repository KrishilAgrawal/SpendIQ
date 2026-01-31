export declare class CreateBudgetLineDto {
    productId?: string;
    description?: string;
    plannedAmount: number;
}
export declare class CreateBudgetDto {
    name: string;
    fiscalYear: number;
    departmentId?: string;
    lines: CreateBudgetLineDto[];
}
