import { Controller, Get, Post, Inject, Param, Query, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageFilters, MessageOrder, MessageResp } from '../interfaces/message-meta';

@Controller('messages')
export class MessagesController {
  constructor(@Inject(MessagesService) private messagesService: MessagesService) {}

  @Get('/')
  async getAll(
    @Query('page') page: number,
    @Query('filter') filter: MessageFilters,
    @Query('order') order: MessageOrder,
    @Query('search') search: string,
  ): Promise<MessageResp> {
    return await this.messagesService.getAll(page, filter, order, search);
  }

  @Get('/get-one')
  async getOneById(@Query('id') id: string): Promise<MessageResp> {
    return await this.messagesService.getOneById(id);
  }

  @Post('/generate')
  async addNew(@Query('count') count: number): Promise<MessageResp> {
    return await this.messagesService.addNew(count);
  }

  @Delete('/delete')
  async delete(@Query('id') id: string): Promise<MessageResp> {
    return await this.messagesService.delete(id);
  }
}
