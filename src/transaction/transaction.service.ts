import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { Wallet } from '../wallet/wallet.entity';
import { time } from 'console';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>
  ) { }

  async createTransaction(data: Omit<Transaction, 'id' | 'timestamp' | 'exchangeRate'>): Promise<Transaction> {
    const { fromWallet, toWallet, amount, currency } = data;
    const timestamp = `${Date.now()}`;
    const transaction = await this.transactionRepository.save({
      currency, fromWallet, toWallet, amount, exchangeRate: 1, timestamp
    });
    const updatedFromWallet = { ...fromWallet, balance: fromWallet.balance - amount };
    const updateToWallet = { ...toWallet, balance: toWallet.balance + amount };
    await this.walletRepository.save(updateToWallet);
    await this.walletRepository.save(updatedFromWallet);
    return transaction;
  }
}
