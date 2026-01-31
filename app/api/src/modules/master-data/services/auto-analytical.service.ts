import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../common/database/prisma.service";
import { RuleField, RuleOperator } from "@prisma/client";

export interface RuleContext {
  vendorId?: string;
  productCategoryId?: string;
  description?: string;
  accountId?: string;
}

@Injectable()
export class AutoAnalyticalService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Evaluate active rules to find a matching Analytic Account.
   * Returns the ID of the analytic account or null if no match.
   */
  async findAnalyticAccount(context: RuleContext): Promise<string | null> {
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

  async create(data: any) {
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

  async delete(id: string) {
    return this.prisma.autoAnalyticalRule.delete({
      where: { id },
    });
  }

  private matchesRule(conditions: any[], context: RuleContext): boolean {
    if (conditions.length === 0) return false;

    for (const condition of conditions) {
      const field = condition.field as RuleField;
      const operator = condition.operator as RuleOperator;
      const value = condition.value;

      let contextValue: string | undefined;

      switch (field) {
        case RuleField.VENDOR:
          contextValue = context.vendorId;
          break;
        case RuleField.PRODUCT_CATEGORY:
          contextValue = context.productCategoryId;
          break;
        case RuleField.DESCRIPTION:
          contextValue = context.description;
          break;
        case RuleField.ACCOUNT:
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

  private evaluateCondition(
    contextValue: string,
    operator: RuleOperator,
    ruleValue: string,
  ): boolean {
    switch (operator) {
      case RuleOperator.EQUALS:
        return contextValue === ruleValue;
      case RuleOperator.CONTAINS:
        return contextValue.toLowerCase().includes(ruleValue.toLowerCase());
      case RuleOperator.STARTS_WITH:
        return contextValue.toLowerCase().startsWith(ruleValue.toLowerCase());
      default:
        return false;
    }
  }
}
