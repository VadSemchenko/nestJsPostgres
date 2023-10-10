import { Controller, Get } from '@nestjs/common';
import { DefaultService } from './default.service';

@Controller()
export class DefaultController {
  constructor(private readonly appService: DefaultService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
