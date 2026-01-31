"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterDataModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../common/database/database.module");
const contacts_service_1 = require("./services/contacts.service");
const products_service_1 = require("./services/products.service");
const analytical_accounts_service_1 = require("./services/analytical-accounts.service");
const auto_analytical_service_1 = require("./services/auto-analytical.service");
const prisma_service_1 = require("../../common/database/prisma.service");
const contacts_controller_1 = require("./controllers/contacts.controller");
const products_controller_1 = require("./controllers/products.controller");
const analytical_accounts_controller_1 = require("./controllers/analytical-accounts.controller");
const auto_analytical_rules_controller_1 = require("./controllers/auto-analytical-rules.controller");
let MasterDataModule = class MasterDataModule {
};
exports.MasterDataModule = MasterDataModule;
exports.MasterDataModule = MasterDataModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            contacts_controller_1.ContactsController,
            products_controller_1.ProductsController,
            analytical_accounts_controller_1.AnalyticalAccountsController,
            auto_analytical_rules_controller_1.AutoAnalyticalRulesController,
        ],
        providers: [
            contacts_service_1.ContactsService,
            products_service_1.ProductsService,
            analytical_accounts_service_1.AnalyticalAccountsService,
            auto_analytical_service_1.AutoAnalyticalService,
            prisma_service_1.PrismaService,
        ],
        exports: [
            contacts_service_1.ContactsService,
            products_service_1.ProductsService,
            analytical_accounts_service_1.AnalyticalAccountsService,
            auto_analytical_service_1.AutoAnalyticalService,
        ],
    })
], MasterDataModule);
//# sourceMappingURL=master-data.module.js.map