import {
    IsEnum,
    IsNumber,
    IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CompanyName, Currency } from './wallet.enum';


export enum UserState {
    ACTIVE = 'Active',
    IN_ACTIVE = 'Inactive',
}

export class CreateWalletDto {
    @ApiProperty()
    @IsEnum(CompanyName)
    companyName: CompanyName;

    @ApiProperty()
    @IsEnum(Currency)
    currency: Currency;

    @ApiProperty()
    @IsNumber()
    balance: number;
}

export class FindByCompanyNameParams {
    @IsEnum(CompanyName)
    companyName: CompanyName
}

export class FindByIdParams {
    @IsString()
    id: string;
}