import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private walletService: WalletService
  ) { }

  async createTransaction(data: Omit<Transaction, 'id' | 'timestamp' | 'exchangeRate'>): Promise<Transaction> {
    const { fromWallet, toWallet, amount, currency } = data;
    const timestamp = `${Date.now()}`;
    const transaction = await this.transactionRepository.save({
      currency, fromWallet, toWallet, amount, exchangeRate: 1, timestamp
    });
    // TODO: validate if fromWallet's balance stays positive after transaction
    const updatedFromWallet = { ...fromWallet, balance: fromWallet.balance - amount };
    const updateToWallet = { ...toWallet, balance: toWallet.balance + amount };
    // TODO: calculate everything here and provide all the amount to wallet service
    this.walletService.addTransactionToTheWallet('hello', 'world');
    return transaction;
  }
}
