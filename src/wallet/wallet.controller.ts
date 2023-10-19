import { Controller, Get, Req, Request, Post, Param, Query, Body, Response } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';
import { CompanyName, Currency } from './wallet.enum';
import { CreateWalletDto } from './wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  // @Get('getWalletsBycompanyName')
  // async getWalletsBycompanyName(@Query() query: { id: string }): Promise<string> {
  //   return this.walletService.getWalletsBycompanyName();
  // }

  // @Get('getWalletById')
  // async getWalletById(@Req() request: Request): Promise<string> {
  //   return this.walletService.getWalletById();
  // }

  @Post('createWallet')
  async createWallet(@Body() createWalletDto: CreateWalletDto): Promise<Wallet> {
    const { companyName, currency } = createWalletDto;
    return this.walletService.createWallet({ companyName, currency });
  }
}
