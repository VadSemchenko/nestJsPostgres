import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { CompanyName, Currency } from './wallet.enum';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: [CompanyName.GUESTY, CompanyName.INTELLIAS] })
    companyName: string;

    @Column({ type: 'float' })
    balance: number;

    @Column({ type: 'enum', enum: [Currency.EUR, Currency.USD] })
    currency: Currency;

    @OneToMany(() => Transaction, transaction => transaction.fromWallet)
    outgoingsTransactions: Transaction[];

    @OneToMany(() => Transaction, transaction => transaction.toWallet)
    incomingTransactions: Transaction[];
}