"use client";

import { PageHeader } from "@/components/layout/page-components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MessageSquare, FileText, HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <PageHeader
        title="Help & Support"
        description="Find answers to common questions and learn how to use SpendIQ effectively"
      />

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Documentation</CardTitle>
              <CardDescription>Complete user guides</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Community</CardTitle>
              <CardDescription>Join our forum</CardDescription>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Contact Support</CardTitle>
              <CardDescription>Get direct help</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle>Frequently Asked Questions</CardTitle>
          </div>
          <CardDescription>
            Quick answers to common questions about SpendIQ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">
              How do I create a new contact?
            </h3>
            <p className="text-sm text-muted-foreground">
              Navigate to <strong>Account → Contact</strong>, then click the{" "}
              <strong>&quot;New Contact&quot;</strong> button in the top right.
              Fill in the required fields including name, email, and type
              (Customer or Vendor). You can also add address details, tags, and
              enable portal access for the contact.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              How do I manage products and categories?
            </h3>
            <p className="text-sm text-muted-foreground">
              Go to <strong>Account → Product</strong> to view all products. You
              can create new products with sales and purchase prices, assign
              them to categories, and link them to analytic accounts for budget
              tracking. Categories can be created on-the-fly when adding or
              editing products.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              What are analytical accounts used for?
            </h3>
            <p className="text-sm text-muted-foreground">
              Analytical accounts help you track expenses and revenues across
              different departments, projects, or cost centers. They allow you
              to allocate budgets and monitor spending patterns independently
              from your main chart of accounts. You can assign analytical
              accounts to products, purchase orders, and sales invoices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              How do I enable portal access for customers?
            </h3>
            <p className="text-sm text-muted-foreground">
              When viewing or editing a contact, you can enable portal access
              which creates a portal user account for that contact. They will
              receive an invitation email with login credentials. Portal users
              can view their invoices, make payments, and track their order
              history through a dedicated portal interface.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              How do budgets work in SpendIQ?
            </h3>
            <p className="text-sm text-muted-foreground">
              Budgets in SpendIQ allow you to set spending limits for specific
              analytical accounts over defined periods. You can create budgets
              with monthly, quarterly, or yearly periods, set target amounts,
              and track actual spending against budgeted amounts. The system
              provides visual indicators and alerts when budgets approach their
              limits.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              What&apos;s the difference between Purchase Orders and Purchase
              Bills?
            </h3>
            <p className="text-sm text-muted-foreground">
              A <strong>Purchase Order</strong> is a commitment to buy goods or
              services from a vendor at specified prices. It&apos;s created
              before receiving the goods. A <strong>Purchase Bill</strong> (also
              called a vendor invoice) is created when you receive the goods and
              the vendor&apos;s invoice, documenting the actual amount owed.
              Purchase Orders help with budget planning, while Purchase Bills
              affect your accounts payable.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              Can I archive records instead of deleting them?
            </h3>
            <p className="text-sm text-muted-foreground">
              Yes! SpendIQ uses archiving instead of permanent deletion to
              maintain data integrity. Archived contacts, products, and other
              records are hidden from default views but remain in the system for
              historical reference and reporting. You can view archived records
              by adjusting the status filter, and restore them if needed.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            A quick guide to help you get up and running with SpendIQ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Set Up Your Master Data</h3>
            <p className="text-sm text-muted-foreground">
              Begin by adding your contacts (customers and vendors) and
              products. This forms the foundation for all transactions in the
              system.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              2. Configure Analytical Accounts
            </h3>
            <p className="text-sm text-muted-foreground">
              Create analytical accounts for departments, projects, or cost
              centers you want to track separately. Assign them to products for
              automatic allocation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Create Budgets</h3>
            <p className="text-sm text-muted-foreground">
              Set up budgets for your analytical accounts to monitor and control
              spending. Define budget periods and target amounts.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              4. Start Processing Transactions
            </h3>
            <p className="text-sm text-muted-foreground">
              Begin creating purchase orders, sales orders, and recording
              invoices. The system will automatically track against your budgets
              and analytical accounts.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>
            Our support team is here to assist you
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Email Support</p>
              <p className="text-sm text-muted-foreground">
                support@spendiq.com
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Live Chat</p>
              <p className="text-sm text-muted-foreground">
                Available Monday-Friday, 9 AM - 6 PM
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
