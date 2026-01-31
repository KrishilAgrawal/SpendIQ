"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { apiRequest } from "@/lib/api";

interface CostCenterNode {
  id: string;
  name: string;
  code: string;
  type: "view" | "account";
  children?: CostCenterNode[];
  balance: number;
}

function TreeNode({
  node,
  level = 0,
}: {
  node: CostCenterNode;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center justify-between py-2 px-2 hover:bg-muted/50 rounded-md transition-colors cursor-pointer group",
        )}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {hasChildren ? (
            <div className="text-muted-foreground w-4 flex justify-center">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          ) : (
            <div className="w-4" />
          )}

          {node.type === "view" ? (
            <Folder
              className={cn(
                "h-4 w-4",
                hasChildren
                  ? "text-blue-500 fill-blue-500/20"
                  : "text-slate-500",
              )}
            />
          ) : (
            <FileText className="h-4 w-4 text-emerald-500" />
          )}

          <span className="font-medium text-sm">
            <span className="text-muted-foreground mr-2 font-mono text-xs">
              [{node.code}]
            </span>
            {node.name}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold tabular-nums">
            ${node.balance.toLocaleString()}
          </span>
          {/* Actions - Hidden by default, show on hover */}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {hasChildren && isOpen && (
        <div className="border-l ml-6 border-dashed border-muted-foreground/20">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const [nodes, setNodes] = useState<CostCenterNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accounts = await apiRequest("/analytical-accounts");
        if (Array.isArray(accounts)) {
          // Transform flat list to tree if parentId exists
          // For now, we map them assuming flat list or handle simple hierarchy if returned
          // This mapper handles flat list for now to ensure display
          const mapped = accounts.map((acc: any) => ({
            id: acc.id,
            name: acc.name,
            code: acc.code,
            type: acc.type === "VIEW" ? "view" : "account",
            balance: 0,
            children: [], // If backend returns hierarchy, this logic needs improvement
          }));
          setNodes(mapped);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Analytical Accounts
          </h2>
          <p className="text-muted-foreground">
            Hierarchy of cost centers and projects.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Group
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost Structure</CardTitle>
          <CardDescription>
            Expand nodes to view detailed account balances.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-card">
            {nodes.map((node) => (
              <TreeNode key={node.id} node={node} />
            ))}
            {nodes.length === 0 && (
              <div className="text-center p-4 text-muted-foreground">
                No analytical accounts found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
