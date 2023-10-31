import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.entity';
import { WalletModule } from '../wallet/wallet.module';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction]), WalletModule],
    providers: [TransactionService],
    controllers: [TransactionController],
    exports: []
})

export class TransactionModule { }