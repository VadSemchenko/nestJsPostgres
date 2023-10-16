import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
  async getWalletsByCompanyId(): Promise<string> {
    return new Promise(res => res('getWalletsByCompanyId'));
  }

  async getWalletsByCompanyIdAndCurrency(): Promise<string> {
    return new Promise(res => res('getWalletsByCompanyIdAndCurrency'));
  }

  async getWalletById(): Promise<string> {
    return new Promise(res => res('getWalletById'));
  }

  async createWallet(): Promise<string> {
    return new Promise(res => res('createWallet'));
  }
}
