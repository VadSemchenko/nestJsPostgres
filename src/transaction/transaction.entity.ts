import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, ManyToOne } from 'typeorm';
import { Currency } from '../wallet/wallet.enum';
import { Wallet } from '../wallet/wallet.entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Wallet, wallet => wallet.outgoingsTransactions)
    fromWallet: Wallet;

    @ManyToOne(() => Wallet, wallet => wallet.incomingTransactions)
    toWallet: Wallet;

    @Column({ type: 'float' })
    amount: number;

    @Column({ type: 'enum', enum: [Currency.EUR, Currency.USD] })
    currency: Currency;

    @Column({ type: 'float' })
    exchangeRate: number;

    @Column()
    timestamp: string;
}