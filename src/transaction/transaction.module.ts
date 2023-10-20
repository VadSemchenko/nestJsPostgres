import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { WalletService } from '../wallet/wallet.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.entity';
import { WalletModule } from '../wallet/wallet.module';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), WalletModule],
    providers: [TransactionService, WalletService],
    controllers: [TransactionController],
    exports: [TypeOrmModule]
})

export class TransactionModule { }