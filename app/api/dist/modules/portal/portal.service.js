"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/database/prisma.service");
let PortalService = class PortalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMyInvoices(userId) {
        var _a;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { contact: true },
        });
        if (!user || (!user.contact && !user.role)) {
            return [];
        }
        const contactId = (_a = user.contact) === null || _a === void 0 ? void 0 : _a.id;
        if (!contactId) {
            return [];
        }
        return this.prisma.invoice.findMany({
            where: { partnerId: contactId },
            include: {
                lines: true,
                payments: true,
            },
            orderBy: { date: "desc" },
        });
    }
    async payInvoice(invoiceId, userId) {
        return { message: "Payment logic stub implemented." };
    }
};
exports.PortalService = PortalService;
exports.PortalService = PortalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PortalService);
//# sourceMappingURL=portal.service.js.map