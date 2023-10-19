import {
    IsEnum,
    IsNumber,
    IsString
} from 'class-validator';

import { CompanyName, Currency } from '../wallet/wallet.enum'



export class CreateTransactionDto {
    @IsString()
    fromWallet: string;

    @IsString()
    toWallet: string;

    @IsEnum(Currency)
    currency: Currency;

    @IsNumber()
    amount: number;

}