import { useState } from "react";
import { StatCard } from "./components/StatCard";
import { TransactionForm, Transaction } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { ReminderForm, Reminder } from "./components/ReminderForm";
import { ReminderList } from "./components/ReminderList";
import { CalendarView } from "./components/CalendarView";
import { ExpenseCharts } from "./components/ExpenseCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Wallet, TrendingUp, TrendingDown, Bell, List } from "lucide-react";
import { Badge } from "./components/ui/badge";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      description: "Salário",
      amount: 5000,
      type: "income",
      category: "salario",
      date: new Date("2025-10-01").toISOString(),
    },
    {
      id: "2",
      description: "Supermercado",
      amount: 350,
      type: "expense",
      category: "alimentacao",
      date: new Date("2025-10-03").toISOString(),
    },
    {
      id: "3",
      description: "Uber",
      amount: 45,
      type: "expense",
      category: "transporte",
      date: new Date("2025-10-05").toISOString(),
    },
    {
      id: "4",
      description: "Aluguel",
      amount: 1200,
      type: "expense",
      category: "moradia",
      date: new Date("2025-10-10").toISOString(),
    },
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Conta de Luz",
      amount: 250,
      dueDate: new Date("2025-10-15"),
      category: "contas",
      recurrence: "monthly",
      isPaid: false,
    },
    {
      id: "2",
      title: "Netflix",
      amount: 55.90,
      dueDate: new Date("2025-10-18"),
      category: "assinaturas",
      recurrence: "monthly",
      isPaid: false,
    },
    {
      id: "3",
      title: "Seguro do Carro",
      amount: 1800,
      dueDate: new Date("2025-10-20"),
      category: "outros",
      recurrence: "yearly",
      isPaid: false,
    },
  ]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const addReminder = (reminder: Omit<Reminder, "id">) => {
    const newReminder = {
      ...reminder,
      id: Date.now().toString(),
    };
    setReminders([newReminder, ...reminders]);
  };

  const toggleReminderPaid = (id: string) => {
    setReminders(
      reminders.map((r) =>
        r.id === id ? { ...r, isPaid: !r.isPaid } : r
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const pendingReminders = reminders.filter((r) => !r.isPaid);
  const totalPendingAmount = pendingReminders.reduce((sum, r) => sum + r.amount, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-gray-900">Controle Financeiro</h1>
              <p className="text-gray-600 mt-2">Gerencie seus gastos e saldos de forma simples</p>
            </div>
            {pendingReminders.length > 0 && (
              <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
                <Bell className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm">Pagamentos Pendentes</p>
                  <p className="text-xs text-gray-600">
                    {pendingReminders.length} lembrete{pendingReminders.length > 1 ? "s" : ""} · {formatCurrency(totalPendingAmount)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Saldo Total"
            value={formatCurrency(balance)}
            icon={Wallet}
            iconColor="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatCard
            title="Receitas"
            value={formatCurrency(totalIncome)}
            icon={TrendingUp}
            iconColor="text-green-600"
            bgColor="bg-green-100"
          />
          <StatCard
            title="Despesas"
            value={formatCurrency(totalExpenses)}
            icon={TrendingDown}
            iconColor="text-red-600"
            bgColor="bg-red-100"
          />
          <StatCard
            title="Total de Transações"
            value={transactions.length.toString()}
            icon={List}
            iconColor="text-blue-600"
            bgColor="bg-blue-100"
          />
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="reminders">
              Lembretes
              {pendingReminders.length > 0 && (
                <Badge className="ml-2 bg-orange-500">{pendingReminders.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionForm onAddTransaction={addTransaction} />
            <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
          </TabsContent>

          <TabsContent value="reminders" className="space-y-6">
            <ReminderForm onAddReminder={addReminder} />
            <ReminderList
              reminders={reminders}
              onTogglePaid={toggleReminderPaid}
              onDeleteReminder={deleteReminder}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <ExpenseCharts transactions={transactions} />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView transactions={transactions} reminders={reminders} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
