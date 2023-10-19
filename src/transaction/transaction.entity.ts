import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyName, Currency } from '../wallet/wallet.enum';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fromWallet: string;

    @Column()
    toWallet: string;

    @Column()
    amount: number;

    @Column({ type: 'enum', enum: [Currency.EUR, Currency.USD] })
    currency: Currency;

    @Column()
    exchangeRate: number;

    @Column()
    timestamp: string;
}