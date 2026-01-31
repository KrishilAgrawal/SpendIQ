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
exports.AutoAnalyticalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/database/prisma.service");
const client_1 = require("@prisma/client");
let AutoAnalyticalService = class AutoAnalyticalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAnalyticAccount(context) {
        const rules = await this.prisma.autoAnalyticalRule.findMany({
            where: { active: true },
            include: { conditions: true },
            orderBy: { priority: "desc" },
        });
        for (const rule of rules) {
            if (this.matchesRule(rule.conditions, context)) {
                return rule.targetAccountId;
            }
        }
        return null;
    }
    async create(data) {
        return this.prisma.autoAnalyticalRule.create({
            data: {
                name: data.name,
                priority: data.priority,
                targetAccountId: data.targetAccountId,
                conditions: {
                    create: data.conditions,
                },
            },
            include: { conditions: true },
        });
    }
    async findAll() {
        return this.prisma.autoAnalyticalRule.findMany({
            include: {
                conditions: true,
            },
            orderBy: { priority: "desc" },
        });
    }
    async delete(id) {
        return this.prisma.autoAnalyticalRule.delete({
            where: { id },
        });
    }
    matchesRule(conditions, context) {
        if (conditions.length === 0)
            return false;
        for (const condition of conditions) {
            const field = condition.field;
            const operator = condition.operator;
            const value = condition.value;
            let contextValue;
            switch (field) {
                case client_1.RuleField.VENDOR:
                    contextValue = context.vendorId;
                    break;
                case client_1.RuleField.PRODUCT_CATEGORY:
                    contextValue = context.productCategoryId;
                    break;
                case client_1.RuleField.DESCRIPTION:
                    contextValue = context.description;
                    break;
                case client_1.RuleField.ACCOUNT:
                    contextValue = context.accountId;
                    break;
            }
            if (!contextValue) {
                return false;
            }
            if (!this.evaluateCondition(contextValue, operator, value)) {
                return false;
            }
        }
        return true;
    }
    evaluateCondition(contextValue, operator, ruleValue) {
        switch (operator) {
            case client_1.RuleOperator.EQUALS:
                return contextValue === ruleValue;
            case client_1.RuleOperator.CONTAINS:
                return contextValue.toLowerCase().includes(ruleValue.toLowerCase());
            case client_1.RuleOperator.STARTS_WITH:
                return contextValue.toLowerCase().startsWith(ruleValue.toLowerCase());
            default:
                return false;
        }
    }
};
exports.AutoAnalyticalService = AutoAnalyticalService;
exports.AutoAnalyticalService = AutoAnalyticalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AutoAnalyticalService);
//# sourceMappingURL=auto-analytical.service.js.map