import { Controller, Get } from '@nestjs/common'
import { ResponseMessage } from 'core/decorators/response-message.decorator'
@Controller()
export class AppController {
  constructor() {}

  @Get()
  @ResponseMessage('Hello')
  getHello() {
    return 'Hello world'
  }
}
