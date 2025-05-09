import { Controller, Get } from '@nestjs/common'
import { Public } from 'core/decorators/public.decorator'
import { ResponseMessage } from 'core/decorators/response-message.decorator'
@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get()
  @ResponseMessage('Hello')
  getHello() {
    return 'Hello world'
  }
}
