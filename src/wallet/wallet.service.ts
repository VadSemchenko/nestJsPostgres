import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {

  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) { }

  // async getWalletsBycompanyName(): Promise<string> {
  //   return new Promise(res => res('getWalletsBycompanyName'));
  // }

  // async getWalletsBycompanyNameAndCurrency(): Promise<string> {
  //   return new Promise(res => res('getWalletsBycompanyNameAndCurrency'));
  // }

  // async getWalletById(): Promise<string> {
  //   return new Promise(res => res('getWalletById'));
  // }

  async createWallet(data: Pick<Wallet, 'companyName' | 'currency'>): Promise<Wallet> {
    const { companyName, currency } = data;
    return this.walletRepository.save({
      currency, companyName, balance: 0
    });
  }
}
