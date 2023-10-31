import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    if (!fromWallet) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: 'From wallet does not exist'
      }, HttpStatus.NOT_FOUND);
    }
    if (!toWallet) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: 'To wallet does not exist'
      }, HttpStatus.NOT_FOUND);
    }
    const timestamp = `${Date.now()}`;

    const doesFromWalletHaveEnoughMoney = fromWallet.balance > amount;

    if (!doesFromWalletHaveEnoughMoney) {

    }


    const params = new URLSearchParams();
    params.set('apikey', CURRENCY_EXCHANGE_API_KEY);
    const fullUrl = `${CURRENCY_EXCHANGE_URL}?${params.toString()}`;
    const { data: currencies } = await ((await fetch(fullUrl)).json());
    const fromWalletRate = currencies[fromWallet.currency]?.value;
    const toWalletRate = currencies[toWallet.currency]?.value;
    const fromWalletAmount = amount * fromWalletRate;
    const toWalletAmount = amount * toWalletRate;
    if (fromWalletAmount > fromWallet.balance) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Insufficient funds'
      }, HttpStatus.BAD_REQUEST);
    }
    // const exchangeRate = await fetch('')

    const transaction = await this.transactionRepository.save({
      currency, fromWallet, toWallet, amount, exchangeRate: fromWalletRate / toWalletRate, timestamp
    });
    // TODO: validate if fromWallet's balance stays positive after transaction
    const updatedFromWallet = { ...fromWallet, balance: fromWallet.balance - fromWalletAmount };
    const updateToWallet = { ...toWallet, balance: toWallet.balance + toWalletAmount };
    // TODO: calculate everything here and provide all the amount to wallet service
    await this.walletService.modifyWallet(updatedFromWallet);
    await this.walletService.modifyWallet(updateToWallet);
    return transaction;
  }
}
