import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
  getWallets(): string {
    return 'Wallets!';
  }
}
