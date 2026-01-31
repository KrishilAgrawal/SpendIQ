import { ProductsService } from "../services/products.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductType } from "@prisma/client";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        name: string;
        code: string | null;
        type: import(".prisma/client").$Enums.ProductType;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        cost: import("@prisma/client/runtime/library").Decimal;
        categoryId: string | null;
        defaultAnalyticAccountId: string | null;
    }>;
    findAll(type?: ProductType): Promise<({
        category: {
            id: string;
            name: string;
            parentId: string | null;
        };
    } & {
        id: string;
        name: string;
        code: string | null;
        type: import(".prisma/client").$Enums.ProductType;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        cost: import("@prisma/client/runtime/library").Decimal;
        categoryId: string | null;
        defaultAnalyticAccountId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            name: string;
            parentId: string | null;
        };
    } & {
        id: string;
        name: string;
        code: string | null;
        type: import(".prisma/client").$Enums.ProductType;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        cost: import("@prisma/client/runtime/library").Decimal;
        categoryId: string | null;
        defaultAnalyticAccountId: string | null;
    }>;
}
