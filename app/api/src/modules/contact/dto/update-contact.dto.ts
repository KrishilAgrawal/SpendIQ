import { PartialType } from "@nestjs/mapped-types";
import { CreateContactDto } from "./create-contact.dto";
import { IsOptional, IsEnum } from "class-validator";
import { Status } from "@prisma/client";

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
