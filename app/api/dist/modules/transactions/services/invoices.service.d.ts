import { PrismaService } from "../../../common/database/prisma.service";
import { CreateInvoiceDto } from "../dto/create-invoice.dto";
import { InvoiceType } from "@prisma/client";
import { JournalEntriesService } from "../../accounting/services/journal-entries.service";
export declare class InvoicesService {
    private prisma;
    private journalEntriesService;
    constructor(prisma: PrismaService, journalEntriesService: JournalEntriesService);
    create(dto: CreateInvoiceDto): Promise<{
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
    }>;
    findAll(type?: InvoiceType, partnerId?: string): Promise<({
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
    findOne(id: string): Promise<{
        lines: ({
            product: {
                id: string;
                name: string;
                code: string | null;
                type: import(".prisma/client").$Enums.ProductType;
                description: string | null;
                price: import("@prisma/client/runtime/library").Decimal;
                cost: import("@prisma/client/runtime/library").Decimal;
                categoryId: string | null;
                defaultAnalyticAccountId: string | null;
            };
            analyticAccount: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                parentId: string | null;
            };
        } & {
            id: string;
            label: string;
            analyticAccountId: string | null;
            productId: string | null;
            invoiceId: string;
            quantity: import("@prisma/client/runtime/library").Decimal;
            priceUnit: import("@prisma/client/runtime/library").Decimal;
            taxRate: import("@prisma/client/runtime/library").Decimal;
            subtotal: import("@prisma/client/runtime/library").Decimal;
        })[];
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
    }>;
    post(id: string): Promise<{
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
    }>;
}
