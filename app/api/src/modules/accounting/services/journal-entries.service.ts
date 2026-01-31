import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { EntryState } from "@prisma/client";

@Injectable()
export class JournalEntriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    date: Date;
    reference?: string;
    lines: {
      accountId: string;
      partnerId?: string;
      label: string;
      debit: number;
      credit: number;
      analyticAccountId?: string;
    }[];
  }) {
    // Validate Double Entry
    const totalDebit = data.lines.reduce((sum, line) => sum + line.debit, 0);
    const totalCredit = data.lines.reduce((sum, line) => sum + line.credit, 0);

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      // Floating point tolerance
      throw new BadRequestException(
        `Unbalanced Journal Entry: Debit ${totalDebit} != Credit ${totalCredit}`,
      );
    }

    return this.prisma.journalEntry.create({
      data: {
        date: data.date,
        reference: data.reference,
        state: EntryState.DRAFT,
        lines: {
          create: data.lines,
        },
      },
      include: { lines: true },
    });
  }

  async findAll() {
    return this.prisma.journalEntry.findMany({
      include: { lines: { include: { account: true, analyticAccount: true } } },
      orderBy: { date: "desc" },
    });
  }

  async findOne(id: string) {
    return this.prisma.journalEntry.findUnique({
      where: { id },
      include: { lines: { include: { account: true, analyticAccount: true } } },
    });
  }

  async post(id: string) {
    return this.prisma.journalEntry.update({
      where: { id },
      data: { state: EntryState.POSTED },
    });
  }
}
