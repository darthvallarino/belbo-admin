export type TransactionType = 'OUTFLOW' | 'INFLOW';

export class Account {
  id: string;
  link: string;
  name: string;
}

export class Transaction {
  id: string;
  category: string;
  type: TransactionType;
  account: Account;
  amount: number;
  balance: number;
  status: string;
  currency: string;
  description: string;
  created_at: Date;
  value_date: string;
}

export class TransactionResponse {
  count: number;
  next: string;
  results: Transaction[];
}

export class TransactionsAmounts {
  in: number;
  out: number;
}

export class CategoryTransactions {
  category: string;
  amounts?: TransactionsAmounts;
  transactions: Transaction[];
}

export class AccountTransactions {
  name: string;
  id: string;
  amounts?: TransactionsAmounts;
  transactions: Transaction[];
}

export class Transactions {
  amounts?: TransactionsAmounts;
  transactions: Transaction[];
}

