import { JournalEntriesService } from "../services/journal-entries.service";
export declare class JournalEntriesController {
    private readonly service;
    constructor(service: JournalEntriesService);
    findAll(): Promise<({
        lines: ({
            account: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: import(".prisma/client").$Enums.AccountType;
                reconcilable: boolean;
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
            createdAt: Date;
            label: string | null;
            debit: import("@prisma/client/runtime/library").Decimal;
            credit: import("@prisma/client/runtime/library").Decimal;
            reconciled: boolean;
            accountId: string;
            partnerId: string | null;
            analyticAccountId: string | null;
            entryId: string;
        })[];
    } & {
        number: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        reference: string | null;
        journalId: string | null;
        state: import(".prisma/client").$Enums.EntryState;
    })[]>;
    findOne(id: string): Promise<{
        lines: ({
            account: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                code: string;
                type: import(".prisma/client").$Enums.AccountType;
                reconcilable: boolean;
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
            createdAt: Date;
            label: string | null;
            debit: import("@prisma/client/runtime/library").Decimal;
            credit: import("@prisma/client/runtime/library").Decimal;
            reconciled: boolean;
            accountId: string;
            partnerId: string | null;
            analyticAccountId: string | null;
            entryId: string;
        })[];
    } & {
        number: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        reference: string | null;
        journalId: string | null;
        state: import(".prisma/client").$Enums.EntryState;
    }>;
    create(body: any): Promise<{
        lines: {
            id: string;
            createdAt: Date;
            label: string | null;
            debit: import("@prisma/client/runtime/library").Decimal;
            credit: import("@prisma/client/runtime/library").Decimal;
            reconciled: boolean;
            accountId: string;
            partnerId: string | null;
            analyticAccountId: string | null;
            entryId: string;
        }[];
    } & {
        number: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        reference: string | null;
        journalId: string | null;
        state: import(".prisma/client").$Enums.EntryState;
    }>;
    post(id: string): Promise<{
        number: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        date: Date;
        reference: string | null;
        journalId: string | null;
        state: import(".prisma/client").$Enums.EntryState;
    }>;
}
