import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageMeta, MessageResp } from '../interfaces/message-meta';

@Controller('messages')
export class MessagesController {
  constructor(@Inject(MessagesService) private messagesService: MessagesService) {}

  @Get('/')
  async getAll(@Query('page') page: number): Promise<MessageResp> {
    return await this.messagesService.getAll(page);
  }

  @Get('/one/:id')
  async getOneById(@Param('id') id: string): Promise<MessageResp> {
    return await this.messagesService.getOneById(id);
  }
}
