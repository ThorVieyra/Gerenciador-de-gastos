# 📚 Guia de Arquitetura - Controle Financeiro

## 🏗️ Estrutura da Aplicação

### Visão Geral
Esta aplicação de controle financeiro foi construída usando **React** com **TypeScript** e **Tailwind CSS**. A arquitetura segue o padrão de **componentes reutilizáveis** com **estado local gerenciado pelo React**.

---

## 📁 Estrutura de Componentes

### 1. **App.tsx** (Componente Principal)
- **Responsabilidade**: Gerenciar o estado global da aplicação
- **Estado Gerenciado**:
  - `transactions`: Array de transações (receitas e despesas)
  - `reminders`: Array de lembretes de pagamento
- **Funções Principais**:
  - `addTransaction()`: Adiciona nova transação
  - `deleteTransaction()`: Remove transação
  - `addReminder()`: Adiciona novo lembrete
  - `toggleReminderPaid()`: Marca lembrete como pago/não pago
  - `deleteReminder()`: Remove lembrete
- **Cálculos**:
  - Saldo total (receitas - despesas)
  - Total de receitas
  - Total de despesas
  - Lembretes pendentes

### 2. **Componentes de Visualização**

#### StatCard.tsx
```typescript
Props: {
  title: string      // Título do card
  value: string      // Valor formatado
  icon: LucideIcon   // Ícone do lucide-react
  iconColor: string  // Cor do ícone
  bgColor: string    // Cor de fundo
}
```
- Exibe cards com estatísticas resumidas

#### TransactionForm.tsx
```typescript
Props: {
  onAddTransaction: (transaction) => void
}

Estado Local:
- description, amount, type, category
```
- Formulário controlado para adicionar transações
- Validação de campos obrigatórios
- Reset automático após submissão

#### TransactionList.tsx
```typescript
Props: {
  transactions: Transaction[]
  onDeleteTransaction: (id) => void
}
```
- Renderiza tabela com todas as transações
- Formatação de data (pt-BR)
- Formatação de moeda (BRL)
- Botão de exclusão por item

#### ReminderForm.tsx
```typescript
Props: {
  onAddReminder: (reminder) => void
}

Recursos:
- Seletor de data com calendário (shadcn/ui)
- Recorrência (única, mensal, anual)
- Categorias específicas para lembretes
```

#### ReminderList.tsx
```typescript
Props: {
  reminders: Reminder[]
  onTogglePaid: (id) => void
  onDeleteReminder: (id) => void
}

Lógica:
- Calcula dias até vencimento
- Status de urgência (vencido, hoje, urgente, pendente)
- Ordenação: pendentes primeiro, depois por data
```

#### CalendarView.tsx
```typescript
Props: {
  transactions: Transaction[]
  reminders: Reminder[]
}

Recursos:
- Calendário visual com marcações
- Painel lateral com eventos da data selecionada
- Integração com date-fns para manipulação de datas
```

#### ExpenseCharts.tsx
```typescript
Props: {
  transactions: Transaction[]
}

Três tipos de gráficos:
1. Barras - Despesas por categoria
2. Linha - Receitas vs Despesas ao longo do tempo
3. Pizza - Distribuição percentual de gastos

Filtros:
- Por período (semana, mês, ano)
- Usa date-fns para cálculos de intervalo
```

---

## 🎨 Bibliotecas Utilizadas

### UI Components
- **shadcn/ui**: Componentes pré-construídos e acessíveis
  - Button, Card, Input, Select, Calendar, Tabs, Badge, etc.
  - Localizados em `/components/ui/`

### Ícones
- **lucide-react**: Biblioteca de ícones
  - Wallet, TrendingUp, TrendingDown, Bell, Calendar, etc.

### Gráficos
- **recharts**: Biblioteca de gráficos
  - BarChart, LineChart, PieChart
  - Responsiva e customizável

### Datas
- **date-fns**: Manipulação de datas
  - Formatação (format)
  - Cálculos (differenceInDays, isSameDay)
  - Intervalos (eachDayOfInterval, eachMonthOfInterval)
  - Locale pt-BR para português

### Estilização
- **Tailwind CSS**: Framework CSS utility-first
  - Classes prontas para responsividade
  - Customização via `/styles/globals.css`

---

## 🔄 Fluxo de Dados

### 1. Entrada de Dados (User Input)
```
Usuário preenche formulário
    ↓
Evento onSubmit
    ↓
Validação dos campos
    ↓
Callback prop (ex: onAddTransaction)
    ↓
Estado atualizado no App.tsx
    ↓
React re-renderiza componentes afetados
```

### 2. Renderização de Lista
```
Estado (transactions/reminders) no App.tsx
    ↓
Passado como props para componentes filhos
    ↓
.map() para renderizar cada item
    ↓
Keys únicas para performance
```

### 3. Cálculos em Tempo Real
```
Estado muda (via setState)
    ↓
React re-executa o componente
    ↓
Variáveis são recalculadas (totalIncome, balance, etc.)
    ↓
UI atualizada automaticamente
```

---

## 📊 Estrutura de Dados

### Transaction (Transação)
```typescript
{
  id: string           // Identificador único
  description: string  // Descrição
  amount: number       // Valor
  type: "income" | "expense"  // Tipo
  category: string     // Categoria
  date: string         // Data ISO
}
```

### Reminder (Lembrete)
```typescript
{
  id: string           // Identificador único
  title: string        // Título
  amount: number       // Valor
  dueDate: Date        // Data de vencimento
  category: string     // Categoria
  recurrence: "none" | "monthly" | "yearly"  // Recorrência
  isPaid: boolean      // Status de pagamento
}
```

---

## 🎯 Padrões de Código

### 1. Componentes Funcionais
```typescript
export function ComponentName({ props }: Props) {
  // Hooks no topo
  const [state, setState] = useState();
  
  // Funções auxiliares
  const handleSomething = () => {};
  
  // Return do JSX
  return <div>...</div>;
}
```

### 2. Props Tipadas (TypeScript)
```typescript
interface ComponentProps {
  data: Type;
  onAction: (param: Type) => void;
}
```

### 3. Estado Local vs Estado Global
- **Local**: Estado usado apenas pelo componente (formulários)
- **Global**: Estado compartilhado (App.tsx) passado via props

### 4. Formatação de Dados
```typescript
// Moeda
new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format(value);

// Data
format(date, "dd/MM/yyyy", { locale: ptBR });
```

---

## 🔑 Conceitos Importantes

### 1. **Controlled Components** (Formulários)
```typescript
const [value, setValue] = useState("");

<Input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>
```
O estado controla o valor do input (fonte única da verdade)

### 2. **Lifting State Up**
Estado compartilhado é "elevado" para o componente pai comum (App.tsx)

### 3. **Props Callback**
Componentes filhos executam funções do pai via props:
```typescript
// No pai (App.tsx)
<ChildComponent onAction={handleAction} />

// No filho
props.onAction(data);
```

### 4. **Keys em Listas**
```typescript
{items.map((item) => (
  <Component key={item.id} {...item} />
))}
```
Keys únicas ajudam o React a otimizar re-renderizações

### 5. **Conditional Rendering**
```typescript
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

---

## 🎨 Sistema de Estilização

### Tailwind Classes Principais
- **Layout**: `flex`, `grid`, `space-y-4`, `gap-6`
- **Responsividade**: `md:grid-cols-3`, `lg:col-span-2`
- **Cores**: `bg-gray-50`, `text-red-600`
- **Espaçamento**: `p-6`, `mt-4`, `mb-8`
- **Bordas**: `rounded-lg`, `border`

### Classes Customizadas
Definidas em `/styles/globals.css`:
- Tipografia padrão por elemento HTML
- Não sobrescrever font-size, font-weight a menos que necessário

---

## 🚀 Performance

### Otimizações Implementadas
1. **Keys únicas**: Evita re-renderizações desnecessárias
2. **Cálculos derivados**: Calculados durante o render, não armazenados
3. **Componentes pequenos**: Cada componente tem responsabilidade única
4. **Props memoization**: React otimiza automaticamente props simples

### Possíveis Melhorias
- `useMemo()` para cálculos pesados
- `useCallback()` para funções passadas como props
- `React.memo()` para componentes puros
- Lazy loading de abas (Tabs)

---

## 📱 Responsividade

### Breakpoints Tailwind
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Estratégia
- Mobile-first: Classes base para mobile
- `md:` e `lg:` para telas maiores
- Grid responsivo: `grid-cols-1 md:grid-cols-3`

---

## 🔍 Debugging

### Ferramentas Úteis
1. **React DevTools**: Inspecionar componentes e estado
2. **Console.log**: Debug de dados
3. **TypeScript**: Erros em tempo de desenvolvimento
4. **Network Tab**: Inspecionar requests (quando integrado)

### Erros Comuns
- Keys duplicadas ou faltantes
- Props não tipadas corretamente
- Estado não atualizado (mutação direta)
- Formatação de datas incorreta (timezone)

---

## 📚 Próximos Passos

Para entender melhor:
1. **React Hooks**: useState, useEffect, useCallback, useMemo
2. **TypeScript**: Interfaces, Types, Generics
3. **Tailwind CSS**: Sistema de utilities
4. **date-fns**: Manipulação de datas
5. **Recharts**: Customização de gráficos

Para praticar:
1. Adicionar nova categoria
2. Criar filtro personalizado
3. Modificar cores do tema
4. Adicionar nova visualização no calendário
