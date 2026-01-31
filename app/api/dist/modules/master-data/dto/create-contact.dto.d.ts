import { ContactType } from "@prisma/client";
export declare class CreateContactDto {
    name: string;
    email?: string;
    phone?: string;
    taxId?: string;
    type: ContactType;
    address?: string;
    city?: string;
    country?: string;
}
