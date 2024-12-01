"use client";

import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/lib/types";

interface SummaryCardsProps {
  transactions: Transaction[];
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  // Initialize with 0 and ensure proper number type
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + (typeof curr.amount === 'number' ? curr.amount : 0), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + (typeof curr.amount === 'number' ? curr.amount : 0), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-card/50 backdrop-blur-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">
            ${totalIncome.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card/50 backdrop-blur-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-rose-500">
            ${totalExpenses.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}