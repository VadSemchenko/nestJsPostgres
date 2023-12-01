import { Controller, Get, Req, Request, Post, Param, Query, Body, Response } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';
import { CompanyName, Currency } from './wallet.enum';
import { CreateWalletDto, FindByIdParams } from './wallet.dto';
import { ApiParam } from '@nestjs/swagger'

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Post('createWallet')
  async createWallet(@Body() createWalletDto: CreateWalletDto): Promise<Wallet> {
    const { companyName, currency, balance } = createWalletDto;
    return this.walletService.createWallet({ companyName, currency, balance });
  }

  @Get('findWalletById/:id')
  @ApiParam({ name: 'id', type: 'string' })
  async findWalletById(@Param() params: FindByIdParams): Promise<Wallet> {
    const { id } = params;
    return this.walletService.findWalletById(`${id}`);
  }
}
