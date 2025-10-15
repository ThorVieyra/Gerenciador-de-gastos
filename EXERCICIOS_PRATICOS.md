# 💪 Exercícios Práticos - Do Básico ao Avançado

## 🎯 Como usar este guia

Cada exercício tem:

- ✅ **Objetivo**: O que você vai aprender
- 📝 **Arquivo**: Onde fazer a modificação
- 🔍 **Dica**: Orientação para resolver
- ✨ **Solução**: Código completo (só olhe se travar!)

---

# 🟢 NÍVEL INICIANTE

## Exercício 1: Mudar Cores do StatCard

**Objetivo**: Entender Props e Tailwind CSS

**Tarefa**: Mude a cor do card de "Saldo Total" para roxo.

**Arquivo**: `/App.tsx`, linhas 154-160

**Dica**:

- Procure `iconColor` e `bgColor`
- Use: `text-purple-600` e `bg-purple-100`

<details>
<summary>✨ Ver Solução</summary>

```typescript
<StatCard
  title="Saldo Total"
  value={formatCurrency(balance)}
  icon={Wallet}
  iconColor="text-purple-600"  // Mudou aqui
  bgColor="bg-purple-100"       // Mudou aqui
/>
```

</details>

---

## Exercício 2: Adicionar Novo StatCard

**Objetivo**: Criar componente com Props

**Tarefa**: Adicione um 4º card mostrando "Total de Transações".

**Arquivo**: `/App.tsx`

**Dica**:

1. Copie um StatCard existente
2. Mude: title, value, icon
3. Use ícone `List` do lucide-react
4. O valor é: `transactions.length`

<details>
<summary>✨ Ver Solução</summary>

```typescript
// Adicione no import:
import { Wallet, TrendingUp, TrendingDown, Bell, List } from "lucide-react";

// No grid de cards, mude para grid-cols-4:
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
  {/* Cards existentes... */}

  {/* Novo card */}
  <StatCard
    title="Total de Transações"
    value={transactions.length.toString()}
    icon={List}
    iconColor="text-purple-600"
    bgColor="bg-purple-100"
  />
</div>
```

</details>

---

## Exercício 3: Adicionar Placeholder em Input

**Objetivo**: Modificar componentes de formulário

**Tarefa**: Mude o placeholder do campo "Descrição" para algo mais específico.

**Arquivo**: `/components/TransactionForm.tsx`, linha ~37

**Dica**: Procure por `placeholder=`

<details>
<summary>✨ Ver Solução</summary>

```typescript
<Input
  id="description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Ex: Almoço no restaurante"  // Mudou aqui
  required
/>
```

</details>

---

## Exercício 4: Mudar Texto do Botão

**Objetivo**: Modificar JSX

**Tarefa**: Mude o texto do botão "Adicionar Transação" para "Salvar".

**Arquivo**: `/components/TransactionForm.tsx`, linha ~81

<details>
<summary>✨ Ver Solução</summary>

```typescript
<Button type="submit" className="w-full">
  <Plus className="w-4 h-4 mr-2" />
  Salvar  {/* Mudou aqui */}
</Button>
```

</details>

---

## Exercício 5: Adicionar Emoji

**Objetivo**: Trabalhar com strings e JSX

**Tarefa**: Adicione um emoji 💰 antes do título "Controle Financeiro".

**Arquivo**: `/App.tsx`, linha ~136

<details>
<summary>✨ Ver Solução</summary>

```typescript
<h1 className="text-3xl text-gray-900">💰 Controle Financeiro</h1>
```

</details>

---

# 🟡 NÍVEL INTERMEDIÁRIO

## Exercício 6: Adicionar Campo no Formulário

**Objetivo**: Trabalhar com useState e formulários controlados

**Tarefa**: Adicione um campo "Observação" (opcional) no TransactionForm.

**Arquivo**: `/components/TransactionForm.tsx`

**Dica**:

1. Adicione estado: `const [observation, setObservation] = useState("")`
2. Adicione Input após os campos existentes
3. NÃO precisa adicionar no tipo Transaction (é extra)

<details>
<summary>✨ Ver Solução</summary>

```typescript
// No início do componente:
const [description, setDescription] = useState("");
const [amount, setAmount] = useState("");
const [type, setType] = useState<"income" | "expense">("expense");
const [category, setCategory] = useState("");
const [observation, setObservation] = useState("");  // Novo

// No JSX, antes dos botões:
<div className="col-span-full">
  <Label htmlFor="observation">Observação (opcional)</Label>
  <Input
    id="observation"
    value={observation}
    onChange={(e) => setObservation(e.target.value)}
    placeholder="Adicione uma nota sobre esta transação"
  />
</div>

// No reset (após submissão):
setObservation("");
```

</details>

---

## Exercício 7: Filtro de Tipo de Transação

**Objetivo**: Filtrar arrays e conditional rendering

**Tarefa**: Adicione botões para filtrar: Todas / Receitas / Despesas.

**Arquivo**: `/components/TransactionList.tsx`

**Dica**:

1. Adicione estado: `const [filter, setFilter] = useState<"all" | "income" | "expense">("all")`
2. Filtre antes do .map()
3. Use Badge ou Button para os filtros

<details>
<summary>✨ Ver Solução</summary>

```typescript
import { useState } from "react";
import { Badge } from "./ui/badge";

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  // Filtra transações
  const filteredTransactions = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  // Antes da tabela:
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">Transações Recentes</h2>
        <div className="flex gap-2">
          <Badge
            variant={filter === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter("all")}
          >
            Todas
          </Badge>
          <Badge
            variant={filter === "income" ? "default" : "outline"}
            className="cursor-pointer bg-green-500"
            onClick={() => setFilter("income")}
          >
            Receitas
          </Badge>
          <Badge
            variant={filter === "expense" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter("expense")}
          >
            Despesas
          </Badge>
        </div>
      </div>

      {/* Use filteredTransactions no .map() em vez de transactions */}
      {filteredTransactions.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Nenhuma transação encontrada.</p>
      ) : (
        // ... resto do código
      )}
    </Card>
  );
}
```

</details>

---

## Exercício 8: Contador de Lembretes Vencidos

**Objetivo**: Trabalhar com datas e lógica

**Tarefa**: Mostre quantos lembretes estão vencidos no header.

**Arquivo**: `/App.tsx`

**Dica**:

1. Filtre reminders onde `differenceInDays(new Date(r.dueDate), new Date()) < 0`
2. E `!r.isPaid`
3. Mostre o `.length` em vermelho

<details>
<summary>✨ Ver Solução</summary>

```typescript
import { differenceInDays } from "date-fns";

// No App.tsx, depois de pendingReminders:
const overdueReminders = reminders.filter((r) =>
  !r.isPaid && differenceInDays(new Date(r.dueDate), new Date()) < 0
);

// No JSX do header, adicione:
{overdueReminders.length > 0 && (
  <Badge className="bg-red-500 ml-2">
    {overdueReminders.length} vencido{overdueReminders.length > 1 ? "s" : ""}
  </Badge>
)}
```

</details>

---

## Exercício 9: Ordenar Transações

**Objetivo**: Manipular arrays

**Tarefa**: Adicione botão para ordenar transações por valor (maior → menor).

**Arquivo**: `/components/TransactionList.tsx`

**Dica**:

1. Estado: `const [sortByAmount, setSortByAmount] = useState(false)`
2. Use `.sort()` antes do .map()
3. `.sort((a, b) => b.amount - a.amount)`

<details>
<summary>✨ Ver Solução</summary>

```typescript
const [sortByAmount, setSortByAmount] = useState(false);

// Antes do .map():
let displayTransactions = [...filteredTransactions];
if (sortByAmount) {
  displayTransactions.sort((a, b) => b.amount - a.amount);
}

// No JSX, adicione botão:
<Button
  variant="outline"
  size="sm"
  onClick={() => setSortByAmount(!sortByAmount)}
>
  {sortByAmount ? "Ordenar por Data" : "Ordenar por Valor"}
</Button>

// Use displayTransactions no .map()
```

</details>

---

## Exercício 10: Validação de Valor Mínimo

**Objetivo**: Validação de formulário

**Tarefa**: Não permita adicionar transações com valor menor que R$ 0.01.

**Arquivo**: `/components/TransactionForm.tsx`

**Dica**: No `handleSubmit`, verifique `parseFloat(amount) < 0.01`

<details>
<summary>✨ Ver Solução</summary>

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!description || !amount || !category) return;

  const valor = parseFloat(amount);

  if (valor < 0.01) {
    alert("O valor deve ser maior que R$ 0,00");
    return;
  }

  onAddTransaction({
    description,
    amount: valor,
    type,
    category,
    date: new Date().toISOString(),
  });

  // Reset...
};
```

</details>

---

# 🔴 NÍVEL AVANÇADO

## Exercício 11: Salvar no LocalStorage

**Objetivo**: Persistência de dados

**Tarefa**: Salve transactions no localStorage e carregue ao abrir.

**Arquivo**: `/App.tsx`

**Dica**: Use `useEffect` e `localStorage.setItem/getItem`

<details>
<summary>✨ Ver Solução</summary>

```typescript
// Inicialize com localStorage:
const [transactions, setTransactions] = useState<Transaction[]>(
  () => {
    const saved = localStorage.getItem("transactions");
    return saved
      ? JSON.parse(saved)
      : [
          // ... dados iniciais
        ];
  },
);

// Salve quando mudar:
useEffect(() => {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions),
  );
}, [transactions]);
```

</details>

---

## Exercício 12: Busca de Transações

**Objetivo**: Input controlado + filtro

**Tarefa**: Adicione campo de busca que filtra por descrição.

**Arquivo**: `/components/TransactionList.tsx`

<details>
<summary>✨ Ver Solução</summary>

```typescript
const [searchTerm, setSearchTerm] = useState("");

const filteredTransactions = transactions.filter((t) => {
  const matchesSearch = t.description
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  if (filter === "all") return matchesSearch;
  return t.type === filter && matchesSearch;
});

// No JSX:
<Input
  placeholder="Buscar transações..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="mb-4"
/>
```

</details>

---

## Exercício 13: Editar Transação

**Objetivo**: Estado complexo + Dialog

**Tarefa**: Adicione botão para editar transação existente.

**Arquivo**: `/App.tsx` + `/components/TransactionList.tsx`

<details>
<summary>✨ Ver Solução</summary>

```typescript
// Em App.tsx, adicione:
const updateTransaction = (id: string, updates: Partial<Transaction>) => {
  setTransactions(
    transactions.map((t) => (t.id === id ? { ...t, ...updates } : t))
  );
};

// Passe como prop:
<TransactionList
  transactions={transactions}
  onDeleteTransaction={deleteTransaction}
  onUpdateTransaction={updateTransaction}  // Novo
/>

// Em TransactionList.tsx:
interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onUpdateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

// Adicione Dialog para edição (use shadcn/ui Dialog)
```

</details>

---

## Exercício 14: Gráfico Personalizado

**Objetivo**: Recharts + processamento de dados

**Tarefa**: Crie gráfico mostrando média de gastos por categoria.

**Arquivo**: `/components/ExpenseCharts.tsx`

<details>
<summary>✨ Ver Solução</summary>

```typescript
// Calcule média por categoria:
const avgByCategory = Object.entries(expensesByCategory).map(([cat, total]) => {
  const count = filteredTransactions.filter(
    (t) => t.type === "expense" && t.category === cat
  ).length;

  return {
    name: CATEGORY_LABELS[cat] || cat,
    media: total / count,
    fill: CATEGORY_COLORS[cat] || "#6b7280",
  };
});

// Adicione novo tipo de gráfico:
<Select value={chartType} onValueChange={setChartType}>
  <SelectContent>
    <SelectItem value="category">Por Categoria</SelectItem>
    <SelectItem value="timeline">Linha do Tempo</SelectItem>
    <SelectItem value="distribution">Distribuição</SelectItem>
    <SelectItem value="average">Média por Categoria</SelectItem>
  </SelectContent>
</Select>

// Renderize:
{chartType === "average" && (
  <Card className="p-6">
    <h3 className="text-lg mb-4">Média de Gastos por Categoria</h3>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={avgByCategory}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip />
        <Bar dataKey="media" fill="#3b82f6">
          {avgByCategory.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Card>
)}
```

</details>

---

## Exercício 15: Exportar CSV

**Objetivo**: File download

**Tarefa**: Botão para baixar transações em CSV.

**Arquivo**: Crie `/components/ExportButton.tsx`

<details>
<summary>✨ Ver Solução</summary>

```typescript
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Transaction } from "./TransactionForm";

interface ExportButtonProps {
  transactions: Transaction[];
}

export function ExportButton({ transactions }: ExportButtonProps) {
  const exportToCSV = () => {
    const headers = ["Data", "Descrição", "Tipo", "Categoria", "Valor"];
    const rows = transactions.map((t) => [
      new Date(t.date).toLocaleDateString("pt-BR"),
      t.description,
      t.type === "income" ? "Receita" : "Despesa",
      t.category,
      t.amount.toFixed(2),
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach((row) => {
      csv += row.map(cell => `"${cell}"`).join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transacoes_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={exportToCSV} variant="outline">
      <Download className="w-4 h-4 mr-2" />
      Exportar CSV
    </Button>
  );
}

// Use em App.tsx:
import { ExportButton } from "./components/ExportButton";

<ExportButton transactions={transactions} />
```

</details>

---

## Exercício 16: Tema Escuro

**Objetivo**: State global + CSS classes

**Tarefa**: Adicione toggle de tema claro/escuro.

**Arquivo**: `/App.tsx`

<details>
<summary>✨ Ver Solução</summary>

```typescript
import { Moon, Sun } from "lucide-react";
import { Switch } from "./components/ui/switch";

const [darkMode, setDarkMode] = useState(false);

// No elemento raiz:
<div className={`min-h-screen p-4 md:p-8 ${
  darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
}`}>

  {/* No header, adicione toggle: */}
  <div className="flex items-center gap-2">
    <Sun className="w-4 h-4" />
    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
    <Moon className="w-4 h-4" />
  </div>

  {/* Adapte cores dos Cards: */}
  <Card className={darkMode ? "bg-gray-800" : "bg-white"}>
    {/* ... */}
  </Card>
</div>
```

</details>

---

## Exercício 17: Confirmação de Exclusão

**Objetivo**: AlertDialog + UX

**Tarefa**: Peça confirmação antes de deletar.

**Arquivo**: `/components/TransactionList.tsx`

<details>
<summary>✨ Ver Solução</summary>

```typescript
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

// No botão de deletar:
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="ghost" size="sm">
      <Trash2 className="w-4 h-4 text-red-500" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
      <AlertDialogDescription>
        Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={() => onDeleteTransaction(transaction.id)}>
        Excluir
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

</details>

---

## Exercício 18: Animações

**Objetivo**: Motion (Framer Motion)

**Tarefa**: Anime entrada de transações na lista.

**Arquivo**: `/components/TransactionList.tsx`

<details>
<summary>✨ Ver Solução</summary>

```typescript
import { motion } from "motion/react";

// Envolva cada TableRow:
{displayTransactions.map((transaction, index) => (
  <motion.tr
    key={transaction.id}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="border-b"
  >
    <TableCell>{formatDate(transaction.date)}</TableCell>
    {/* ... resto */}
  </motion.tr>
))}

// Nota: Pode precisar adaptar estrutura da Table
```

</details>

---

## Exercício 19: Metas de Gastos

**Objetivo**: Estado complexo + comparação

**Tarefa**: Defina meta mensal de gastos e mostre progresso.

**Arquivo**: Crie `/components/SpendingGoal.tsx`

<details>
<summary>✨ Ver Solução</summary>

```typescript
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

interface SpendingGoalProps {
  currentExpenses: number;
}

export function SpendingGoal({ currentExpenses }: SpendingGoalProps) {
  const [goal, setGoal] = useState(5000);
  const [isEditing, setIsEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal.toString());

  const percentage = (currentExpenses / goal) * 100;
  const remaining = goal - currentExpenses;

  const handleSave = () => {
    const newGoal = parseFloat(tempGoal);
    if (newGoal > 0) {
      setGoal(newGoal);
      setIsEditing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg">Meta de Gastos Mensal</h3>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTempGoal(goal.toString());
              setIsEditing(true);
            }}
          >
            Editar
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="flex gap-2">
          <Input
            type="number"
            value={tempGoal}
            onChange={(e) => setTempGoal(e.target.value)}
            placeholder="Meta em R$"
          />
          <Button onClick={handleSave}>Salvar</Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-2">
            <p className="text-sm text-gray-600">
              Gasto: R$ {currentExpenses.toFixed(2)} de R$ {goal.toFixed(2)}
            </p>
            <p className={`text-sm ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
              {remaining >= 0
                ? `Restam R$ ${remaining.toFixed(2)}`
                : `Excedeu em R$ ${Math.abs(remaining).toFixed(2)}`}
            </p>
          </div>
          <Progress value={Math.min(percentage, 100)} />
          <p className="text-xs text-gray-500 mt-2">{percentage.toFixed(1)}% da meta</p>
        </>
      )}
    </Card>
  );
}

// Use em App.tsx:
<SpendingGoal currentExpenses={totalExpenses} />
```

</details>

---

## Exercício 20: Notificações Toast

**Objetivo**: Feedback ao usuário

**Tarefa**: Mostre toast ao adicionar/deletar transação.

**Arquivo**: `/App.tsx` + componentes

<details>
<summary>✨ Ver Solução</summary>

```typescript
import { toast } from "sonner@2.0.3";

// Em addTransaction:
const addTransaction = (transaction: Omit<Transaction, "id">) => {
  const newTransaction = {
    ...transaction,
    id: Date.now().toString(),
  };
  setTransactions([newTransaction, ...transactions]);

  toast.success("Transação adicionada com sucesso!", {
    description: `${transaction.description} - R$ ${transaction.amount.toFixed(2)}`,
  });
};

// Em deleteTransaction:
const deleteTransaction = (id: string) => {
  setTransactions(transactions.filter((t) => t.id !== id));
  toast.success("Transação excluída");
};

// Certifique-se de ter o Toaster no App:
import { Toaster } from "./components/ui/sonner";

<div className="min-h-screen">
  <Toaster />
  {/* ... resto */}
</div>
```

</details>

---

# 🎯 Desafios Finais

## Desafio 1: Dashboard Completo

Crie uma nova aba "Dashboard" com:

- Resumo semanal
- Comparação mês atual vs anterior
- Top 3 categorias de gasto
- Gráfico de tendência

## Desafio 2: Recorrência Automática

Implemente que lembretes mensais:

- Sejam auto-criados no próximo mês após pagamento
- Mostrem histórico de pagamentos

## Desafio 3: Orçamento por Categoria

Permita definir orçamento para cada categoria e:

- Mostre progresso individual
- Alerte quando ultrapassar
- Sugira onde economizar

## Desafio 4: Múltiplas Contas

Adicione sistema de contas (Carteira, Banco, Poupança):

- Saldo separado por conta
- Transferência entre contas
- Filtros por conta

## Desafio 5: Relatórios PDF

Gere relatório em PDF com:

- Resumo do período
- Gráficos
- Lista de transações
- Use biblioteca `jspdf`

---

# ✅ Checklist de Conclusão

Marque conforme completa:

### Iniciante

- [ ] Exercício 1: Cores do StatCard
- [ ] Exercício 2: Novo StatCard
- [ ] Exercício 3: Placeholder
- [ ] Exercício 4: Texto do botão
- [ ] Exercício 5: Emoji

### Intermediário

- [ ] Exercício 6: Campo no formulário
- [ ] Exercício 7: Filtro de tipo
- [ ] Exercício 8: Contador vencidos
- [ ] Exercício 9: Ordenação
- [ ] Exercício 10: Validação

### Avançado

- [ ] Exercício 11: LocalStorage
- [ ] Exercício 12: Busca
- [ ] Exercício 13: Editar
- [ ] Exercício 14: Gráfico customizado
- [ ] Exercício 15: Exportar CSV
- [ ] Exercício 16: Tema escuro
- [ ] Exercício 17: Confirmação
- [ ] Exercício 18: Animações
- [ ] Exercício 19: Metas
- [ ] Exercício 20: Toasts

### Desafios

- [ ] Dashboard completo
- [ ] Recorrência
- [ ] Orçamento por categoria
- [ ] Múltiplas contas
- [ ] Relatórios PDF

---

**Parabéns por chegar até aqui! 🎉**

Cada exercício completo é uma vitória. Continue praticando!