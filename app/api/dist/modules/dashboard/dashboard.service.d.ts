import { PrismaService } from "../../common/database/prisma.service";
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getMetrics(): Promise<{
        balance: number;
        income: number;
        expense: number;
        savings: number;
        savingsRate: number;
    }>;
    getMoneyFlow(): Promise<{
        name: string;
        income: number;
        expense: number;
    }[]>;
    getRecentTransactions(): Promise<({
        partner: {
            id: string;
            email: string | null;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            type: import(".prisma/client").$Enums.ContactType;
            phone: string | null;
            taxId: string | null;
            address: string | null;
            city: string | null;
            country: string | null;
            portalUserId: string | null;
            isPortalUser: boolean;
        };
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
    getBudgetUtilization(): Promise<{
        name: string;
        value: number;
        color: string;
    }[]>;
}
