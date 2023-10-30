import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// 
import querystring from 'querystring';
// import queryString from 'node:querystring';

import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { WalletService } from 'src/wallet/wallet.service';
import { CURRENCY_EXCHANGE_API_KEY } from '../../constants';

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
    console.log('QUERY STRING', querystring);
    const exchangeUrl = 'http://data.fixer.io/api/convert';
    // const query = {
    //   access_key: CURRENCY_EXCHANGE_API_KEY,
    //   from: fromWallet.currency,
    //   to: toWallet.currency,
    //   amount
    // };

    const params = new URLSearchParams();
    params.set('access_key', CURRENCY_EXCHANGE_API_KEY);
    params.set('from', fromWallet.currency);
    params.set('to', toWallet.currency);
    params.set('amount', `${amount}`);

    // const queryString = querystring.stringify(params);

    // Append the query string to the base URL
    const fullUrl = `${exchangeUrl}?${params.toString()}`;
    const exchangeRateResponse = await ((await fetch(fullUrl)).json());
    console.log('EXCHANGE RESPONSE', exchangeRateResponse);
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
