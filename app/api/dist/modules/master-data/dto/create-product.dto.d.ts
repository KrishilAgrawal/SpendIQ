import { ProductType } from "@prisma/client";
export declare class CreateProductDto {
    name: string;
    code?: string;
    description?: string;
    price: number;
    cost: number;
    type: ProductType;
    categoryId?: string;
}
