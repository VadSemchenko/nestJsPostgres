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

  async getWalletsByCompanyId(): Promise<string> {
    return new Promise(res => res('getWalletsByCompanyId'));
  }

  async getWalletsByCompanyIdAndCurrency(): Promise<string> {
    return new Promise(res => res('getWalletsByCompanyIdAndCurrency'));
  }

  async getWalletById(): Promise<string> {
    return new Promise(res => res('getWalletById'));
  }

  async createWallet(data: Pick<Wallet, 'companyId' | 'currency'>): Promise<Wallet> {
    const { companyId, currency } = data;
    return this.walletRepository.save({
      currency, companyId, balance: 0
    });
    // return new Promise(res => res('createWallet'));
  }
}
