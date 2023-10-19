import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post('createTransaction')
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { currency, fromWallet, toWallet, amount } = createTransactionDto;
    return this.transactionService.createTransaction({ fromWallet, toWallet, currency, amount });
  }
}
