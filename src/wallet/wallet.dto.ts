import {
    IsEnum,
    IsNumber,
    IsString
} from 'class-validator';

import { CompanyName, Currency } from './wallet.enum';


export enum UserState {
    ACTIVE = 'Active',
    IN_ACTIVE = 'Inactive',
}

export class CreateWalletDto {
    @IsEnum(CompanyName)
    companyName: CompanyName;

    @IsEnum(Currency)
    currency: Currency;

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