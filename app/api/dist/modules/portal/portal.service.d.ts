import { PrismaService } from "../../common/database/prisma.service";
export declare class PortalService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMyInvoices(userId: string): Promise<({
        lines: {
            id: string;
            label: string;
            analyticAccountId: string | null;
            productId: string | null;
            invoiceId: string;
            quantity: import("@prisma/client/runtime/library").Decimal;
            priceUnit: import("@prisma/client/runtime/library").Decimal;
            taxRate: import("@prisma/client/runtime/library").Decimal;
            subtotal: import("@prisma/client/runtime/library").Decimal;
        }[];
        payments: {
            id: string;
            createdAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            invoiceId: string;
            paymentId: string;
        }[];
    } & {
        number: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        partnerId: string;
        type: import(".prisma/client").$Enums.InvoiceType;
        status: import(".prisma/client").$Enums.InvoiceStatus;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        taxAmount: import("@prisma/client/runtime/library").Decimal;
        dueDate: Date;
        paymentState: import(".prisma/client").$Enums.PaymentState;
        salesOrderId: string | null;
        purchaseOrderId: string | null;
        journalEntryId: string | null;
    })[]>;
    payInvoice(invoiceId: string, userId: string): Promise<{
        message: string;
    }>;
}
