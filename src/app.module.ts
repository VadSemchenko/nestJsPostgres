import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { DefaultController } from './default/default.controller';
import { DefaultService } from './default/default.service';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';
import { WalletModule } from './wallet/wallet.module'
import { Wallet } from './wallet/wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '@a00190019AAa',
      username: 'postgres',
      entities: [Wallet],
      database: 'postgres',
      synchronize: true,
      // logging: true,
    }),
    WalletModule
  ],
  // controllers: [DefaultController, WalletController],
  // providers: [DefaultService, WalletService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
