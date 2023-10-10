import { Controller, Get, Req, Request, Post, Param, Query, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletController {
  constructor(private readonly appService: WalletService) { }

  @Get('getWalletsByCompanyId')
  async getWalletsByCompanyId(@Query() query: { id: string }): Promise<string> {
    console.log('ID AT GET WALLETS BY COMPANY ID', query.id);
    return this.appService.getWalletsByCompanyId();
  }

  @Get('getWalletsByCompanyIdAndCurrency/:companyId/:currency')
  async getWalletsByCompanyIdAndCurrency(@Param() params: {
    companyId: string;
    currency: string;
  }): Promise<string> {
    console.log('PARAMS', params);
    return this.appService.getWalletsByCompanyIdAndCurrency();
  }

  @Get('getWalletById')
  async getWalletById(@Req() request: Request): Promise<string> {
    return this.appService.getWalletById();
  }

  @Post('createWallet')
  async createWallet(@Body() body: {
    companyId: string;
    currency: string;
  }): Promise<string> {
    console.log('BODY', body);
    return this.appService.createWallet();
  }
}
