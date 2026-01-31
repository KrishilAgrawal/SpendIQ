import { Test, TestingModule } from "@nestjs/testing";
import { JournalEntriesService } from "./journal-entries.service";
import { PrismaService } from "../../../common/prisma/prisma.service";
import { BadRequestException } from "@nestjs/common";

const mockPrismaService = {
  journalEntry: {
    create: jest.fn(),
  },
};

describe("JournalEntriesService", () => {
  let service: JournalEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JournalEntriesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<JournalEntriesService>(JournalEntriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should throw BadRequestException if credits do not equal debits", async () => {
      const unbalancedLine = {
        date: new Date(),
        lines: [
          { accountId: "1", debit: 100, credit: 0, label: "Debit" },
          { accountId: "2", debit: 0, credit: 50, label: "Credit" }, // Mismatch
        ],
      };

      await expect(service.create(unbalancedLine)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should call prisma.create if entries are balanced", async () => {
      const balancedLine = {
        date: new Date(),
        lines: [
          { accountId: "1", debit: 100, credit: 0, label: "Debit" },
          { accountId: "2", debit: 0, credit: 100, label: "Credit" },
        ],
      };

      await service.create(balancedLine);
      expect(mockPrismaService.journalEntry.create).toHaveBeenCalled();
    });
  });
});
