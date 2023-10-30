import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { WalletModule } from './wallet/wallet.module'
import { Wallet } from './wallet/wallet.entity';
import { TransactionModule } from './transaction/transaction.module'
import { Transaction } from './transaction/transaction.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '@a00190019AAa',
      username: 'postgres',
      entities: [Wallet, Transaction],
      database: 'postgres',
      synchronize: true,
    }),
    WalletModule, TransactionModule
  ],
})
export class AppModule { }
