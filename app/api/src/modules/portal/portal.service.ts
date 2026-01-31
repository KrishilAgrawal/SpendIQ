import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../common/database/prisma.service";

@Injectable()
export class PortalService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyInvoices(userId: string) {
    // 1. Get User's linked Contact
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { contact: true },
    });

    if (!user || (!user.contact && !user.role)) {
      // If no contact linked, return empty or error?
      // Admin might want to see this too? But this service is for Portal.
      return [];
    }

    const contactId = user.contact?.id;

    if (!contactId) {
      // Fallback: If no contact linked, maybe return empty
      return [];
    }

    // 2. Fetch Invoices where partnerId matches contactId
    return this.prisma.invoice.findMany({
      where: { partnerId: contactId },
      include: {
        lines: true,
        payments: true,
      },
      orderBy: { date: "desc" },
    });
  }

  async payInvoice(invoiceId: string, userId: string) {
    // Logic to mock payment for portal user
    // Verify invoice belongs to user first
    // Update status to PAID or create Payment
    // For now, simple stub
    return { message: "Payment logic stub implemented." };
  }
}
