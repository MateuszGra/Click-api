import { Injectable } from '@nestjs/common';
import { MessageMetaEntity } from '../entities/message-meta.entity';
import { MessageResp } from '../interfaces/message-meta';

@Injectable()
export class MessagesService {
  async getAll(page = 1): Promise<MessageResp> {
    try {
      const maxPerPage = 10;
      const [items, count]: [MessageMetaEntity[], number] = await MessageMetaEntity.findAndCount({
        skip: maxPerPage * (page - 1),
        take: maxPerPage,
      });
      const pagesCount = Math.ceil(count / maxPerPage);

      return {
        success: true,
        count: count,
        pagesCount: pagesCount,
        items: items,
      };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }

  async getOneById(id: string): Promise<MessageResp> {
    try {
      const message: MessageMetaEntity = await MessageMetaEntity.findOne(id);
      if (!message) throw new Error(`Message not found`);
      return {
        success: true,
        items: [message],
      };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }
}
