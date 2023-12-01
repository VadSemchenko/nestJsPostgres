import {
    IsEnum,
    IsNumber,
    IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CompanyName, Currency } from '../wallet/wallet.enum'



export class CreateTransactionDto {
    @ApiProperty({ default: '1' })
    @IsString()
    fromWallet: string;

    @ApiProperty({ default: '4' })
    @IsString()
    toWallet: string;

    @ApiProperty({ default: 'EUR' })
    @IsEnum(Currency)
    currency: Currency;

    @ApiProperty({ default: 1 })
    @IsNumber()
    amount: number;

}