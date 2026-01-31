import { PrismaService } from "../../../common/database/prisma.service";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductType } from "@prisma/client";
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
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
