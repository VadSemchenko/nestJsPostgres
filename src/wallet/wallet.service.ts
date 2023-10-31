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

  async createWallet(data: Pick<Wallet, 'companyName' | 'currency' | 'balance'>): Promise<Wallet> {
    const { companyName, currency, balance } = data;
    return this.walletRepository.save({
      currency, companyName, balance
    });
  }

  async findWalletById(stringId: string): Promise<Wallet> {
    const id = + stringId;
    return this.walletRepository.findOneBy({ id });
  }

  async modifyWallet(data: Wallet): Promise<Wallet> {
    return this.walletRepository.save(data);
  }
}
