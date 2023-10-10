import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletController {
  constructor(private readonly appService: WalletService) { }

  @Get()
  getWallets(): string {
    return this.appService.getWallets();
  }
}
