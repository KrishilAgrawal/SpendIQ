"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const invoices_controller_1 = require("./controllers/invoices.controller");
const invoices_service_1 = require("./services/invoices.service");
const prisma_service_1 = require("../../common/database/prisma.service");
const accounting_module_1 = require("../accounting/accounting.module");
let TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule;
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [accounting_module_1.AccountingModule],
        controllers: [invoices_controller_1.InvoicesController],
        providers: [invoices_service_1.InvoicesService, prisma_service_1.PrismaService],
    })
], TransactionsModule);
//# sourceMappingURL=transactions.module.js.map