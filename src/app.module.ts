import { Module } from '@nestjs/common';
import { DefaultController } from './default/default.controller';
import { DefaultService } from './default/default.service';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';

@Module({
  imports: [],
  controllers: [DefaultController, WalletController],
  providers: [DefaultService, WalletService],
})
export class AppModule { }
