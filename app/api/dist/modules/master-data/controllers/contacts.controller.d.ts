import { ContactsService } from "../services/contacts.service";
import { CreateContactDto } from "../dto/create-contact.dto";
import { ContactType } from "@prisma/client";
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(createContactDto: CreateContactDto): Promise<{
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
    }>;
    findAll(type?: ContactType): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
        payments: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            date: Date;
            reference: string;
            partnerId: string;
            type: import(".prisma/client").$Enums.PaymentType;
            status: import(".prisma/client").$Enums.PaymentStatus;
            journalEntryId: string | null;
            amount: import("@prisma/client/runtime/library").Decimal;
            method: string;
        }[];
        invoices: {
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
        }[];
    } & {
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
    }>;
}
