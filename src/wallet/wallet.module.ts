import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Wallet } from './wallet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet])],
    providers: [WalletService],
    controllers: [WalletController],
    exports: [WalletService]
})

export class WalletModule { }