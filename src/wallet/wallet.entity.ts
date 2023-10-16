import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyId: string;

    @Column()
    balance: number;

    @Column()
    currency: string;
}