import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { WalletService } from '../wallet/wallet.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService, private readonly walletService: WalletService) { }

  @Post('createTransaction')
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { currency, fromWallet: fromWalletId, toWallet: toWalletId, amount } = createTransactionDto;
    console.log('ATTEMPT TO CREATE TRANSACTION');
    const fromWallet = await this.walletService.findWalletById(fromWalletId);
    console.log('FROM WALLET', fromWallet);
    const toWallet = await this.walletService.findWalletById(toWalletId);
    console.log('TO WALLET', toWallet);
    return this.transactionService.createTransaction({ fromWallet, toWallet, currency, amount });
  }
}
