import {
    IsEnum,
    IsNumber,
    IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CompanyName, Currency } from '../wallet/wallet.enum'



export class CreateTransactionDto {
    @ApiProperty()
    @IsString()
    fromWallet: string;

    @ApiProperty()
    @IsString()
    toWallet: string;

    @ApiProperty()
    @IsEnum(Currency)
    currency: Currency;

    @ApiProperty()
    @IsNumber()
    amount: number;

}