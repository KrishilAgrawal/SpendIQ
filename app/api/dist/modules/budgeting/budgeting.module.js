"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetingModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../common/database/database.module");
const budgets_service_1 = require("./services/budgets.service");
const budgets_controller_1 = require("./controllers/budgets.controller");
let BudgetingModule = class BudgetingModule {
};
exports.BudgetingModule = BudgetingModule;
exports.BudgetingModule = BudgetingModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [budgets_controller_1.BudgetsController],
        providers: [budgets_service_1.BudgetsService],
        exports: [budgets_service_1.BudgetsService],
    })
], BudgetingModule);
//# sourceMappingURL=budgeting.module.js.map