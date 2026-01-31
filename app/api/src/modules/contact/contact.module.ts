import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { DatabaseModule } from "../database/database.module";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
