import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    compamyId: string;

    @Column()
    balance: number;

    @Column()
    currency: string;
}