import { IsOptional, IsEnum, IsBoolean, IsString } from "class-validator";
import { ContactType, Status } from "@prisma/client";

export class FilterContactDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ContactType)
  type?: ContactType;

  @IsOptional()
  @IsBoolean()
  isPortalUser?: boolean;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}
