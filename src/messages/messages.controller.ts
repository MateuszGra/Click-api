import { Controller, Get, Post, Inject, Param, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageResp } from '../interfaces/message-meta';

@Controller('messages')
export class MessagesController {
  constructor(@Inject(MessagesService) private messagesService: MessagesService) {}

  @Get('/')
  async getAll(@Query('page') page: number): Promise<MessageResp> {
    return await this.messagesService.getAll(page);
  }

  @Get('/get-one')
  async getOneById(@Query('id') id: string): Promise<MessageResp> {
    return await this.messagesService.getOneById(id);
  }

  @Post('/generate')
  async addNew(@Query('count') count: number): Promise<MessageResp> {
    return await this.messagesService.addNew(count);
  }
}
