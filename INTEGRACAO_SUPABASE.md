# 🗄️ Guia de Integração com Supabase

## O que é Supabase?

Supabase é uma alternativa open-source ao Firebase que oferece:
- ✅ Banco de dados PostgreSQL
- ✅ Autenticação de usuários
- ✅ Storage de arquivos
- ✅ APIs automáticas (REST e GraphQL)
- ✅ Realtime subscriptions

---

## 🚀 Passo 1: Criar Conta no Supabase

1. Acesse: https://supabase.com
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Anote suas credenciais:
   - **Project URL**: `https://seu-projeto.supabase.co`
   - **API Key (anon/public)**: Chave pública para client

---

## 📋 Passo 2: Criar Estrutura do Banco de Dados

### 2.1 Tabela: transactions
```sql
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para melhor performance
CREATE INDEX transactions_user_id_idx ON transactions(user_id);
CREATE INDEX transactions_date_idx ON transactions(date);

-- RLS (Row Level Security) - Segurança
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Política: Usuário só vê suas próprias transações
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions"
  ON transactions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions"
  ON transactions FOR DELETE
  USING (auth.uid() = user_id);
```

### 2.2 Tabela: reminders
```sql
CREATE TABLE reminders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  due_date DATE NOT NULL,
  category TEXT NOT NULL,
  recurrence TEXT NOT NULL CHECK (recurrence IN ('none', 'monthly', 'yearly')),
  is_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para melhor performance
CREATE INDEX reminders_user_id_idx ON reminders(user_id);
CREATE INDEX reminders_due_date_idx ON reminders(due_date);

-- RLS (Row Level Security)
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reminders"
  ON reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders"
  ON reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
  ON reminders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders"
  ON reminders FOR DELETE
  USING (auth.uid() = user_id);
```

**Como executar no Supabase:**
1. Vá em **SQL Editor** no dashboard
2. Cole o código SQL
3. Clique em **RUN**

---

## 💻 Passo 3: Instalar Cliente do Supabase

```bash
npm install @supabase/supabase-js
```

---

## 🔧 Passo 4: Configurar Cliente Supabase

### Criar arquivo: `/lib/supabase.ts`
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco de dados
export type Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string;
          user_id: string;
          description: string;
          amount: number;
          type: 'income' | 'expense';
          category: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          description: string;
          amount: number;
          type: 'income' | 'expense';
          category: string;
          date: string;
        };
      };
      reminders: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          amount: number;
          due_date: string;
          category: string;
          recurrence: 'none' | 'monthly' | 'yearly';
          is_paid: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          title: string;
          amount: number;
          due_date: string;
          category: string;
          recurrence: 'none' | 'monthly' | 'yearly';
          is_paid?: boolean;
        };
      };
    };
  };
};
```

### Criar arquivo: `.env.local`
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

⚠️ **IMPORTANTE**: Adicione `.env.local` no `.gitignore`

---

## 🔐 Passo 5: Implementar Autenticação

### Criar: `/components/AuthForm.tsx`
```typescript
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Verifique seu email para confirmar o cadastro!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">
        {mode === 'login' ? 'Login' : 'Cadastro'}
      </h2>
      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Carregando...' : mode === 'login' ? 'Entrar' : 'Cadastrar'}
        </Button>
      </form>
      <button
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        className="text-sm text-blue-600 mt-4"
      >
        {mode === 'login' ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
      </button>
    </Card>
  );
}
```

---

## 🔄 Passo 6: Adaptar App.tsx para usar Supabase

```typescript
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/AuthForm';
import { Session } from '@supabase/supabase-js';
// ... outros imports

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  // Verificar autenticação
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Carregar transações do banco
  useEffect(() => {
    if (session) {
      loadTransactions();
      loadReminders();
    }
  }, [session]);

  const loadTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Erro ao carregar transações:', error);
    } else {
      setTransactions(data || []);
    }
  };

  const loadReminders = async () => {
    const { data, error } = await supabase
      .from('reminders')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) {
      console.error('Erro ao carregar lembretes:', error);
    } else {
      setReminders(data || []);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
      }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao adicionar transação:', error);
      alert('Erro ao adicionar transação');
    } else {
      setTransactions([data, ...transactions]);
    }
  };

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar transação:', error);
    } else {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const addReminder = async (reminder: Omit<Reminder, 'id'>) => {
    const { data, error } = await supabase
      .from('reminders')
      .insert([{
        title: reminder.title,
        amount: reminder.amount,
        due_date: reminder.dueDate.toISOString().split('T')[0],
        category: reminder.category,
        recurrence: reminder.recurrence,
        is_paid: false,
      }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao adicionar lembrete:', error);
    } else {
      setReminders([data, ...reminders]);
    }
  };

  const toggleReminderPaid = async (id: string) => {
    const reminder = reminders.find((r) => r.id === id);
    if (!reminder) return;

    const { error } = await supabase
      .from('reminders')
      .update({ is_paid: !reminder.isPaid })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar lembrete:', error);
    } else {
      setReminders(
        reminders.map((r) => (r.id === id ? { ...r, isPaid: !r.isPaid } : r))
      );
    }
  };

  const deleteReminder = async (id: string) => {
    const { error } = await supabase
      .from('reminders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar lembrete:', error);
    } else {
      setReminders(reminders.filter((r) => r.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Mostrar tela de login se não estiver autenticado
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <AuthForm />
      </div>
    );
  }

  // Resto do código da aplicação...
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl">Controle Financeiro</h1>
            <p className="text-gray-600 mt-2">{session.user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Sair
          </Button>
        </header>
        {/* Resto dos componentes... */}
      </div>
    </div>
  );
}
```

---

## 🔔 Passo 7: Realtime (Opcional)

Para sincronização em tempo real entre dispositivos:

```typescript
// No useEffect do App.tsx
useEffect(() => {
  if (!session) return;

  // Subscribe a mudanças em transactions
  const transactionsSubscription = supabase
    .channel('transactions_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'transactions',
        filter: `user_id=eq.${session.user.id}`,
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          setTransactions((prev) => [payload.new as Transaction, ...prev]);
        } else if (payload.eventType === 'DELETE') {
          setTransactions((prev) => prev.filter((t) => t.id !== payload.old.id));
        } else if (payload.eventType === 'UPDATE') {
          setTransactions((prev) =>
            prev.map((t) => (t.id === payload.new.id ? payload.new as Transaction : t))
          );
        }
      }
    )
    .subscribe();

  return () => {
    transactionsSubscription.unsubscribe();
  };
}, [session]);
```

---

## 📊 Passo 8: Backup e Exportação

### Exportar dados (CSV)
```typescript
const exportToCSV = () => {
  const headers = ['Data', 'Descrição', 'Tipo', 'Categoria', 'Valor'];
  const rows = transactions.map((t) => [
    new Date(t.date).toLocaleDateString('pt-BR'),
    t.description,
    t.type,
    t.category,
    t.amount,
  ]);

  let csv = headers.join(',') + '\n';
  rows.forEach((row) => {
    csv += row.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transacoes.csv';
  a.click();
};
```

---

## 🔒 Segurança

### Boas Práticas:
1. ✅ **Nunca** comite credenciais no Git
2. ✅ Use variáveis de ambiente (`.env.local`)
3. ✅ Habilite RLS (Row Level Security) em todas as tabelas
4. ✅ Use a chave `anon` no frontend (nunca a `service_role`)
5. ✅ Valide dados no backend também
6. ✅ Implemente rate limiting no Supabase
7. ✅ Use HTTPS sempre

---

## 🚀 Deploy

### Vercel / Netlify:
1. Configure as variáveis de ambiente no dashboard
2. Conecte seu repositório Git
3. Deploy automático a cada push

---

## 📚 Recursos Adicionais

- **Documentação Supabase**: https://supabase.com/docs
- **SQL Tutorial**: https://www.postgresql.org/docs/
- **Row Level Security**: https://supabase.com/docs/guides/auth/row-level-security
- **Supabase Auth**: https://supabase.com/docs/guides/auth

---

## 🆘 Problemas Comuns

### Erro: "new row violates row-level security policy"
- Verifique se o usuário está autenticado
- Confirme que as políticas RLS estão corretas

### Transações não aparecem após INSERT
- Adicione `.select()` após o `.insert()`
- Verifique se o RLS permite SELECT

### "relation does not exist"
- Confirme que executou os scripts SQL no Supabase
- Verifique o schema (padrão: public)

---

## ✅ Checklist de Integração

- [ ] Conta criada no Supabase
- [ ] Projeto criado
- [ ] Tabelas criadas (transactions, reminders)
- [ ] RLS habilitado e políticas criadas
- [ ] Cliente Supabase instalado
- [ ] Arquivo de configuração criado
- [ ] Variáveis de ambiente configuradas
- [ ] Autenticação implementada
- [ ] CRUD de transações funcionando
- [ ] CRUD de lembretes funcionando
- [ ] Teste de logout/login
- [ ] Deploy realizado
