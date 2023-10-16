import { Controller, Get, Req, Request, Post, Param, Query, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Get('getWalletsByCompanyId')
  async getWalletsByCompanyId(@Query() query: { id: string }): Promise<string> {
    console.log('ID AT GET WALLETS BY COMPANY ID', query.id);
    return this.walletService.getWalletsByCompanyId();
  }

  @Get('getWalletsByCompanyIdAndCurrency/:companyId/:currency')
  async getWalletsByCompanyIdAndCurrency(@Param() params: {
    companyId: string;
    currency: string;
  }): Promise<string> {
    console.log('PARAMS', params);
    return this.walletService.getWalletsByCompanyIdAndCurrency();
  }

  @Get('getWalletById')
  async getWalletById(@Req() request: Request): Promise<string> {
    return this.walletService.getWalletById();
  }

  @Post('createWallet')
  async createWallet(@Body() body: {
    companyId: string;
    currency: string;
  }): Promise<Wallet> {
    const { companyId, currency } = body;
    return this.walletService.createWallet({ companyId, currency });
  }
}
