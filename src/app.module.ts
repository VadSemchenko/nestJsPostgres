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
      host: 'ec2-54-86-180-157.compute-1.amazonaws.com',
      url: 'postgres://dirgkhzqxuycuc:d8e631e31a2eafdc038785e04a35a4108e7fceea7dfb80c2715cf1044ece340b@ec2-54-86-180-157.compute-1.amazonaws.com:5432/d1kt96110abqr8',
      port: 5432,
      password: 'd8e631e31a2eafdc038785e04a35a4108e7fceea7dfb80c2715cf1044ece340b',
      username: 'dirgkhzqxuycuc',
      entities: [Wallet, Transaction],
      database: 'd1kt96110abqr8',
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: true
    }),
    WalletModule, TransactionModule
  ],
})
export class AppModule { }


