import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import {
  Transaction,
  TransactionResponse,
  CategoryTransactions,
  TransactionsAmounts,
  AccountTransactions,
  Transactions,
} from '../dto/transaction.dto';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  url: string;
  username: string;
  password: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.url = configService.get<string>('BELVO_URL');
    this.username = configService.get<string>('BELVO_USERNAME');
    this.password = configService.get<string>('BELVO_PASS');
  }

  private getTransactionsAmounts(
    transactions: Transaction[],
  ): TransactionsAmounts {
    let result: TransactionsAmounts = {
      in: 0,
      out: 0,
    };
    transactions.map((transaction: Transaction) => {
      if (transaction.type === 'INFLOW') {
        result.in = result.in + transaction.amount;
      } else {
        result.out = result.out + transaction.amount;
      }
    });
    return result;
  }

  private groupTransactionsByAccount(
    transactions: Transaction[],
  ): AccountTransactions[] {
    let result: AccountTransactions[] = [];
    transactions.map((transaction: Transaction) => {
      const f = result.find((t) => t.id === transaction.account.id);
      if (f) {
        f.transactions = [...f.transactions, transaction];
      } else {
        result = [
          ...result,
          {
            name: transaction.account.name,
            id: transaction.account.id,
            transactions: [transaction],
          },
        ];
      }
    });
    return result;
  }

  private groupTransactionsByCategory(
    transactions: Transaction[],
  ): CategoryTransactions[] {
    let result: CategoryTransactions[] = [];
    transactions.map((transaction: Transaction) => {
      if (transaction.category) {
        const f = result.find((t) => t.category === transaction.category);
        if (f) {
          f.transactions = [...f.transactions, transaction];
        } else {
          result = [
            ...result,
            {
              category: transaction.category,
              transactions: [transaction],
            },
          ];
        }
      }
    });
    return result;
  }

  async getAllTransactions(link: string): Promise<Transaction[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<TransactionResponse>(`${this.url}/transactions?link=${link}`, {
          auth: {
            username: this.username,
            password: this.password,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw 'An error happened!';
          }),
        ),
    );
    return data.results;
  }

  async getTransactionsByCategory(
    link: string,
  ): Promise<CategoryTransactions[]> {
    const transactions: Transaction[] = await this.getAllTransactions(link);
    const categoryTransactions = this.groupTransactionsByCategory(
      transactions,
    ).map((category) => {
      return {
        ...category,
        amounts: this.getTransactionsAmounts(category.transactions),
      };
    });

    return categoryTransactions;
  }

  async getTransactionsByAccount(link: string): Promise<AccountTransactions[]> {
    const transactions: Transaction[] = await this.getAllTransactions(link);
    const accountTransactions = this.groupTransactionsByAccount(
      transactions,
    ).map((category) => {
      return {
        ...category,
        amounts: this.getTransactionsAmounts(category.transactions),
      };
    });

    return accountTransactions;
  }

  async getTransactions(link: string): Promise<Transactions> {
    const transactions: Transaction[] = await this.getAllTransactions(link);
    return {
      amounts: this.getTransactionsAmounts(transactions),
      transactions,
    };
  }
}
