"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionList } from "@/components/transactions/transaction-list";
import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { useTransactions } from "@/lib/hooks/use-transactions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Transaction } from "@/lib/types";
import { DateRange } from "react-day-picker";

export default function Home() {
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
  } = useTransactions([
    {
      id: "1",
      amount: 1000,
      description: "Salary",
      category: "Income",
      type: "income",
      date: "2024-03-25",
    },
    {
      id: "2",
      amount: 50,
      description: "Groceries",
      category: "Food",
      type: "expense",
      date: "2024-03-24",
    },
  ]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange({
      from: range?.from || undefined,
      to: range?.to || undefined,
    });
  };

  const handleSubmit = (data: Omit<Transaction, "id">) => {
    if (selectedTransaction) {
      editTransaction(selectedTransaction.id, data);
    } else {
      addTransaction(data);
    }
    setIsDialogOpen(false);
    setSelectedTransaction(undefined);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Expense Tracker</h1>
          <div className="flex items-center gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedTransaction ? "Edit" : "Add"} Transaction
                  </DialogTitle>
                </DialogHeader>
                <TransactionForm
                  onSubmit={handleSubmit}
                  initialData={selectedTransaction}
                />
              </DialogContent>
            </Dialog>
            <ThemeToggle />
          </div>
        </div>

        <SummaryCards transactions={transactions} />

        <div className="space-y-4">
          <TransactionFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />

          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
          />
        </div>
      </div>
    </main>
  );
}
