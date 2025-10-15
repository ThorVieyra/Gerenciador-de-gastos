# 🎓 Roteiro de Estudos - Front-end Iniciante

## 📍 Você está aqui: Iniciante
### Objetivo: Dominar a arquitetura desta aplicação

---

## 🗺️ Visão Geral do Roteiro

```
Nível 1: Fundamentos HTML/CSS
    ↓
Nível 2: JavaScript Básico
    ↓
Nível 3: React Fundamentos
    ↓
Nível 4: TypeScript Básico
    ↓
Nível 5: Componentes desta Aplicação
    ↓
Nível 6: Estado e Interações
    ↓
Nível 7: Integrações Avançadas
```

**Tempo estimado**: 4-8 semanas (dedicando 1-2h por dia)

---

# 📚 NÍVEL 1: Fundamentos HTML/CSS (3-5 dias)

## O que você precisa saber:

### 1.1 HTML Básico
- **Tags**: `<div>`, `<p>`, `<h1>`, `<button>`, `<input>`, `<form>`
- **Atributos**: `class`, `id`, `type`, `placeholder`
- **Estrutura**: Hierarquia de elementos (pai > filho)

**Recursos**:
- MDN Web Docs: https://developer.mozilla.org/pt-BR/docs/Web/HTML
- FreeCodeCamp HTML: https://www.freecodecamp.org/

### 1.2 CSS Básico
- **Seletores**: `.classe`, `#id`, `elemento`
- **Propriedades**: `color`, `background`, `padding`, `margin`, `display`, `flex`
- **Box Model**: margin → border → padding → content

**Recursos**:
- CSS Tricks: https://css-tricks.com/
- Flexbox Froggy: https://flexboxfroggy.com/ (jogo para aprender flex)

### 1.3 Tailwind CSS (usado nesta aplicação)
- **Conceito**: Classes utilitárias prontas
- **Exemplos**: `p-4` (padding), `bg-blue-500` (background azul), `flex` (display flex)

**Exercício Prático 1**:
```html
<!-- Crie este card usando Tailwind -->
<div class="p-6 bg-white rounded-lg shadow">
  <h2 class="text-xl">Meu Card</h2>
  <p class="text-gray-600 mt-2">Descrição aqui</p>
</div>
```

**Onde ver isso na aplicação**:
- Abra `/components/StatCard.tsx`
- Veja as classes: `p-6`, `flex`, `items-center`, `rounded-full`

---

# 🟨 NÍVEL 2: JavaScript Básico (5-7 dias)

## O que você precisa saber:

### 2.1 Variáveis e Tipos
```javascript
// Variáveis
const nome = "João";        // String (texto)
let idade = 25;             // Number (número)
const ativo = true;         // Boolean (verdadeiro/falso)

// Arrays (listas)
const numeros = [1, 2, 3, 4, 5];
const nomes = ["Ana", "João", "Maria"];

// Objetos
const pessoa = {
  nome: "João",
  idade: 25,
  email: "joao@email.com"
};
```

### 2.2 Funções
```javascript
// Função tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function (usada no React)
const somar = (a, b) => {
  return a + b;
};

// Arrow function simplificada
const somar = (a, b) => a + b;
```

### 2.3 Métodos de Array (MUITO IMPORTANTE)
```javascript
const numeros = [1, 2, 3, 4, 5];

// .map() - Transforma cada item
const dobrados = numeros.map((num) => num * 2);
// Resultado: [2, 4, 6, 8, 10]

// .filter() - Filtra itens
const pares = numeros.filter((num) => num % 2 === 0);
// Resultado: [2, 4]

// .reduce() - Reduz a um único valor
const soma = numeros.reduce((total, num) => total + num, 0);
// Resultado: 15

// .find() - Encontra um item
const tres = numeros.find((num) => num === 3);
// Resultado: 3
```

**Exercício Prático 2**:
```javascript
// Dado este array de transações:
const transactions = [
  { description: "Salário", amount: 5000, type: "income" },
  { description: "Aluguel", amount: 1200, type: "expense" },
  { description: "Freelance", amount: 800, type: "income" }
];

// 1. Filtre apenas as despesas (expense)
const despesas = transactions.filter(t => t.type === "expense");

// 2. Some todos os valores de receita (income)
const totalReceitas = transactions
  .filter(t => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

// 3. Transforme em um array só com as descrições
const descricoes = transactions.map(t => t.description);
```

**Onde ver isso na aplicação**:
- Abra `/App.tsx`, linhas 110-119
- Veja como `.filter()` e `.reduce()` calculam totais

---

# ⚛️ NÍVEL 3: React Fundamentos (7-10 dias)

## O que você precisa saber:

### 3.1 Componentes
```typescript
// Componente = Função que retorna HTML (JSX)
function MeuComponente() {
  return (
    <div>
      <h1>Olá, Mundo!</h1>
    </div>
  );
}

// Exportar para usar em outros arquivos
export default MeuComponente;
```

### 3.2 JSX (JavaScript + XML)
```typescript
// Você pode usar JavaScript dentro do JSX com {}
function Saudacao() {
  const nome = "João";
  const hora = new Date().getHours();
  
  return (
    <div>
      <h1>Olá, {nome}!</h1>
      {hora < 12 ? <p>Bom dia!</p> : <p>Boa tarde!</p>}
    </div>
  );
}
```

### 3.3 Props (Propriedades)
```typescript
// Props = Dados passados de pai para filho
interface CardProps {
  titulo: string;
  valor: number;
}

function Card({ titulo, valor }: CardProps) {
  return (
    <div className="p-4 bg-white">
      <h2>{titulo}</h2>
      <p>{valor}</p>
    </div>
  );
}

// Usando o componente
function App() {
  return <Card titulo="Saldo" valor={1000} />;
}
```

### 3.4 Estado (useState)
```typescript
import { useState } from 'react';

function Contador() {
  // [valor atual, função para mudar]
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
    </div>
  );
}
```

### 3.5 Renderização de Listas
```typescript
function ListaDeNomes() {
  const nomes = ["Ana", "João", "Maria"];
  
  return (
    <ul>
      {nomes.map((nome, index) => (
        <li key={index}>{nome}</li>
      ))}
    </ul>
  );
}
```

**Exercício Prático 3**:
Crie um componente de TODO list simples:

```typescript
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');
  
  const adicionarTodo = () => {
    if (input) {
      setTodos([...todos, input]);
      setInput('');
    }
  };
  
  return (
    <div className="p-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={adicionarTodo}>Adicionar</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Onde ver isso na aplicação**:
- Abra `/components/StatCard.tsx` - Veja Props
- Abra `/components/TransactionForm.tsx` - Veja useState
- Abra `/components/TransactionList.tsx` - Veja .map() renderizando lista

---

# 🔷 NÍVEL 4: TypeScript Básico (3-5 dias)

## O que você precisa saber:

### 4.1 Tipos Básicos
```typescript
// Tipos primitivos
let nome: string = "João";
let idade: number = 25;
let ativo: boolean = true;

// Arrays tipados
let numeros: number[] = [1, 2, 3];
let nomes: string[] = ["Ana", "João"];

// Tipos personalizados
type User = {
  nome: string;
  idade: number;
  email: string;
};

const usuario: User = {
  nome: "João",
  idade: 25,
  email: "joao@email.com"
};
```

### 4.2 Interfaces
```typescript
// Interface = Contrato de como um objeto deve ser
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";  // União de tipos
  category: string;
  date: string;
}

const transacao: Transaction = {
  id: "1",
  description: "Salário",
  amount: 5000,
  type: "income",
  category: "salario",
  date: "2025-10-01"
};
```

### 4.3 Tipando Props
```typescript
interface CardProps {
  titulo: string;
  valor: number;
  cor?: string;  // ? = opcional
}

function Card({ titulo, valor, cor = "blue" }: CardProps) {
  return <div className={`bg-${cor}-500`}>...</div>;
}
```

### 4.4 Tipando Funções
```typescript
// Função tipada
const somar = (a: number, b: number): number => {
  return a + b;
};

// Tipo de função como parâmetro
interface ButtonProps {
  onClick: () => void;  // função sem retorno
  label: string;
}

function Button({ onClick, label }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

**Exercício Prático 4**:
```typescript
// Crie os tipos para este componente:
interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          {todo.text}
          <button onClick={() => onDelete(todo.id)}>Deletar</button>
        </li>
      ))}
    </ul>
  );
}
```

**Onde ver isso na aplicação**:
- Abra `/components/TransactionForm.tsx`, linhas 9-17 - Veja interface Transaction
- Abra `/components/StatCard.tsx`, linhas 3-9 - Veja interface de Props

---

# 🎯 NÍVEL 5: Componentes desta Aplicação (7-10 dias)

## Ordem de estudo dos componentes:

### 5.1 SEMANA 1: Componentes Simples

#### Dia 1-2: StatCard.tsx
**O que aprender**:
- ✅ Componente apresentacional (só exibe dados)
- ✅ Props tipadas
- ✅ Uso de ícones (lucide-react)
- ✅ Classes Tailwind

**Desafio**: Crie um StatCard com sua própria cor e ícone

**Experimente**:
```typescript
// Em App.tsx, adicione:
import { Heart } from "lucide-react";

<StatCard
  title="Meu Card"
  value="R$ 999"
  icon={Heart}
  iconColor="text-pink-600"
  bgColor="bg-pink-100"
/>
```

#### Dia 3-4: TransactionForm.tsx
**O que aprender**:
- ✅ Formulários controlados (value + onChange)
- ✅ useState para cada input
- ✅ Validação de formulário
- ✅ Callback props (onAddTransaction)
- ✅ Select component (shadcn/ui)

**Desafio**: Adicione um novo campo "observação" ao formulário

**Experimente**:
```typescript
// Adicione este estado:
const [observation, setObservation] = useState("");

// Adicione este input:
<Input
  value={observation}
  onChange={(e) => setObservation(e.target.value)}
  placeholder="Observação (opcional)"
/>
```

#### Dia 5-6: TransactionList.tsx
**O que aprender**:
- ✅ Renderização de listas (.map)
- ✅ Formatação de dados (data, moeda)
- ✅ Conditional rendering (cores diferentes)
- ✅ Table component (shadcn/ui)
- ✅ Keys em listas

**Desafio**: Adicione filtro para mostrar só receitas ou só despesas

**Experimente**:
```typescript
// Adicione um filtro:
const [filtro, setFiltro] = useState<"all" | "income" | "expense">("all");

const transacoesFiltradas = transactions.filter((t) => {
  if (filtro === "all") return true;
  return t.type === filtro;
});

// Use transacoesFiltradas no .map()
```

### 5.2 SEMANA 2: Componentes Intermediários

#### Dia 7-9: ReminderForm.tsx e ReminderList.tsx
**O que aprender**:
- ✅ Componente Calendar (shadcn/ui)
- ✅ Popover component
- ✅ Trabalhar com datas (date-fns)
- ✅ Checkbox component
- ✅ Cálculos de data (differenceInDays)

**Desafio**: Adicione um campo para horário do lembrete

#### Dia 10-12: CalendarView.tsx
**O que aprender**:
- ✅ Múltiplos props (transactions + reminders)
- ✅ Filtrar dados por data (isSameDay)
- ✅ Calendar com modifiers
- ✅ Grid layout (lg:grid-cols-3)

**Desafio**: Adicione contador de eventos no calendário

### 5.3 SEMANA 3: Componente Avançado

#### Dia 13-17: ExpenseCharts.tsx
**O que aprender**:
- ✅ Biblioteca Recharts
- ✅ Múltiplos tipos de gráficos
- ✅ Processamento de dados complexo
- ✅ date-fns avançado (eachDayOfInterval)
- ✅ Aggregation de dados (.reduce complexo)

**Experimente**:
```typescript
// Entenda este código passo a passo:
const expensesByCategory = filteredTransactions
  .filter((t) => t.type === "expense")  // 1. Só despesas
  .reduce((acc, t) => {                 // 2. Agrupa por categoria
    if (!acc[t.category]) {
      acc[t.category] = 0;
    }
    acc[t.category] += t.amount;
    return acc;
  }, {} as { [key: string]: number });
```

**Desafio**: Crie um novo tipo de gráfico (ex: média de gastos)

---

# 🔗 NÍVEL 6: Estado e Fluxo de Dados (5-7 dias)

## Entendendo o App.tsx

### 6.1 Estrutura do Estado Global
```typescript
// App.tsx gerencia TODO o estado
const [transactions, setTransactions] = useState<Transaction[]>([]);
const [reminders, setReminders] = useState<Reminder[]>([]);
```

**Por que?** Porque múltiplos componentes precisam destes dados.

### 6.2 Fluxo de Adição
```
1. Usuário preenche TransactionForm
2. Clica em "Adicionar"
3. TransactionForm chama: onAddTransaction(dados)
4. App.tsx recebe e executa: addTransaction(dados)
5. addTransaction atualiza: setTransactions([novo, ...antigos])
6. React re-renderiza TransactionList com novos dados
```

**Experimente - Adicione console.log**:
```typescript
// Em App.tsx
const addTransaction = (transaction: Omit<Transaction, "id">) => {
  console.log("1. App.tsx recebeu:", transaction);
  
  const newTransaction = {
    ...transaction,
    id: Date.now().toString(),
  };
  console.log("2. Criou com ID:", newTransaction);
  
  setTransactions([newTransaction, ...transactions]);
  console.log("3. Estado atualizado!");
};

// Em TransactionForm.tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("0. Formulário enviado:", { description, amount });
  
  onAddTransaction({
    description,
    amount: parseFloat(amount),
    type,
    category,
    date: new Date().toISOString(),
  });
};
```

### 6.3 Lifting State Up
```
         App.tsx
       /    |    \
      /     |     \
  Form   List   Charts
```

**Regra de Ouro**: O estado fica no componente pai comum.

**Exercício Prático 6**:
Trace o fluxo completo de deletar uma transação:
1. Onde está o botão de deletar?
2. Que função ele chama?
3. Como essa função chega até o App.tsx?
4. O que acontece com o estado?

---

# 🚀 NÍVEL 7: Conceitos Avançados (7-10 dias)

### 7.1 useEffect (Efeitos Colaterais)
```typescript
import { useEffect } from 'react';

function Component() {
  const [data, setData] = useState([]);
  
  // Executa quando o componente monta
  useEffect(() => {
    console.log("Componente montou!");
    
    // Cleanup (quando desmonta)
    return () => {
      console.log("Componente desmontou!");
    };
  }, []); // [] = executa só uma vez
  
  // Executa quando 'data' muda
  useEffect(() => {
    console.log("Data mudou:", data);
  }, [data]);
}
```

**Onde usar**: Buscar dados de API, localStorage, etc.

### 7.2 Custom Hooks
```typescript
// Hook personalizado para localStorage
function useLocalStorage(key: string, initialValue: any) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// Usar:
const [transactions, setTransactions] = useLocalStorage('transactions', []);
```

### 7.3 Conditional Rendering Avançado
```typescript
// Renderização condicional complexa
function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!data) return <div>Sem dados</div>;
  
  return <div>Dados: {data}</div>;
}
```

---

# 📋 Exercícios Práticos Finais

## Exercício 1: Adicionar Categoria
1. Adicione uma nova categoria "Educação" nas transações
2. Crie uma cor para ela (#8b5cf6 - roxo)
3. Veja aparecer nos gráficos

## Exercício 2: Filtro de Data
1. Adicione um DatePicker no TransactionList
2. Filtre transações por data selecionada
3. Mostre contagem de resultados

## Exercício 3: Modo Escuro
1. Adicione um toggle (Switch)
2. Use useState para guardar preferência
3. Mude classes: `bg-white` ↔ `bg-gray-900`

## Exercício 4: Exportar Dados
1. Crie um botão "Exportar CSV"
2. Converta transactions para CSV
3. Faça download do arquivo

---

# 🎯 Checklist de Progresso

### Fundamentos
- [ ] Entendo HTML básico
- [ ] Entendo CSS e Flexbox
- [ ] Sei usar classes Tailwind
- [ ] Conheço JavaScript básico
- [ ] Domino .map(), .filter(), .reduce()

### React
- [ ] Sei criar componentes
- [ ] Entendo Props
- [ ] Uso useState confortavelmente
- [ ] Sei renderizar listas
- [ ] Entendo conditional rendering

### TypeScript
- [ ] Sei tipar variáveis
- [ ] Criei interfaces
- [ ] Tipo props de componentes
- [ ] Entendo tipos opcionais (?)

### Aplicação
- [ ] Li todos os componentes
- [ ] Entendo o fluxo de dados
- [ ] Sei onde está cada estado
- [ ] Consigo modificar componentes
- [ ] Criei funcionalidades novas

---

# 📚 Recursos de Estudo

## Documentação Oficial
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind**: https://tailwindcss.com/docs

## Cursos Gratuitos
- **FreeCodeCamp**: https://www.freecodecamp.org/
- **Scrimba React**: https://scrimba.com/learn/learnreact
- **TypeScript para Iniciantes**: https://www.totaltypescript.com/tutorials

## Canais YouTube (PT-BR)
- **Rocketseat**: Tutoriais React
- **Filipe Deschamps**: Conceitos explicados
- **Código Fonte TV**: Fundamentos

## Prática
- **CodeSandbox**: https://codesandbox.io/ (code online)
- **Frontend Mentor**: https://www.frontendmentor.io/ (desafios)

---

# 🎯 Próximos Passos

Depois de dominar esta aplicação:

1. **Next.js**: Framework React para produção
2. **Integração com API**: Supabase, Firebase
3. **Testes**: Jest, React Testing Library
4. **Performance**: useMemo, useCallback, React.memo
5. **Animações**: Framer Motion
6. **Deploy**: Vercel, Netlify

---

# ❓ FAQ - Perguntas Frequentes

**P: Quanto tempo leva para aprender?**
R: 4-8 semanas estudando 1-2h por dia. Cada pessoa tem seu ritmo!

**P: Preciso saber tudo antes de começar?**
R: Não! Aprenda fazendo. Comece pelo Nível 1 e avance gradualmente.

**P: Por onde começo SE SOU ZERO?**
R: HTML/CSS primeiro, depois JavaScript, depois React.

**P: E se eu travar em algum conceito?**
R: Reveja o nível anterior. Conceitos se constroem um sobre o outro.

**P: Como sei se estou pronto para o próximo nível?**
R: Faça os exercícios práticos. Se conseguir, está pronto!

---

# 💡 Dicas de Ouro

1. **Escreva código à mão**: Não copie e cole tudo
2. **Erre bastante**: Erros ensinam mais que acertos
3. **Use console.log**: Debug é seu melhor amigo
4. **Leia mensagens de erro**: Elas explicam o problema
5. **Pratique diariamente**: 30min todo dia > 3h uma vez
6. **Documente seu aprendizado**: Crie um diário de estudos
7. **Ensine alguém**: Melhor forma de consolidar conhecimento

---

# 🎊 Conclusão

Você tem em mãos uma aplicação completa e real. Use-a como seu laboratório de aprendizado. 

**Lembre-se**: Toda pessoa expert foi iniciante um dia. A diferença está na consistência.

Boa jornada! 🚀
