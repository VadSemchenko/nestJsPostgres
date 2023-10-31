import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// 
import querystring from 'querystring';
// import queryString from 'node:querystring';

import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { CURRENCY_EXCHANGE_API_KEY, CURRENCY_EXCHANGE_URL } from '../../constants';

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

    const doesFromWalletHaveEnoughMoney = fromWallet.balance > amount;

    if (!doesFromWalletHaveEnoughMoney) {

    }


    const params = new URLSearchParams();
    params.set('apikey', CURRENCY_EXCHANGE_API_KEY);
    const fullUrl = `${CURRENCY_EXCHANGE_URL}?${params.toString()}`;
    console.log('FULL URL', fullUrl);
    const { data: currencies } = await ((await fetch(fullUrl)).json());
    console.log('EXCHANGE RESPONSE', currencies);
    const fromWalletRate = currencies[fromWallet.currency]?.value;
    const toWalletRate = currencies[toWallet.currency]?.value;
    console.log('RATES', fromWalletRate, toWalletRate);
    // const exchangeRate = await fetch('')

    const transaction = await this.transactionRepository.save({
      currency, fromWallet, toWallet, amount, exchangeRate: 1, timestamp
    });
    // TODO: validate if fromWallet's balance stays positive after transaction
    const updatedFromWallet = { ...fromWallet, balance: fromWallet.balance - amount };
    const updateToWallet = { ...toWallet, balance: toWallet.balance + amount };
    // TODO: calculate everything here and provide all the amount to wallet service
    // this.walletService.addTransactionToTheWallet('hello', 'world');
    return transaction;
  }
}
