import { InvoiceType } from "@prisma/client";
export declare class CreateInvoiceLineDto {
    productId?: string;
    label: string;
    quantity: number;
    priceUnit: number;
    analyticAccountId?: string;
}
export declare class CreateInvoiceDto {
    number: string;
    type: InvoiceType;
    partnerId: string;
    date: string;
    dueDate: string;
    lines: CreateInvoiceLineDto[];
}
