import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyName, Currency } from './wallet.enum';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: [CompanyName.GUESTY, CompanyName.INTELLIAS] })
    companyName: string;

    @Column()
    balance: number;

    @Column({ type: 'enum', enum: [Currency.EUR, Currency.USD] })
    currency: Currency;
}