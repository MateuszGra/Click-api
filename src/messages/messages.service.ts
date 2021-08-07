import { Injectable } from '@nestjs/common';
import { MessageMetaEntity } from '../entities/message-meta.entity';
import { MessageFilters, MessageOrder, MessageResp } from '../interfaces/message-meta';
import { MessageBodyEntity } from '../entities/message-body.entity';
import { Like } from 'typeorm';

@Injectable()
export class MessagesService {
  async getAll(
    page = 1,
    filter: MessageFilters = MessageFilters.date,
    order: MessageOrder = MessageOrder.asc,
    search: string,
  ): Promise<MessageResp> {
    try {
      const maxPerPage = 10;
      const orders = {};
      orders[filter] = order.toUpperCase();

      if (search) {
        const [items, count]: [MessageMetaEntity[], number] = await MessageMetaEntity.findAndCount({
          skip: maxPerPage * (page - 1),
          take: maxPerPage,
          order: orders,
          where: [
            { name: Like(`%${search}%`), sender: Like(`%${search}%`) },
            { name: Like(`%${search}%`) },
            { sender: Like(`%${search}%`) },
          ],
        });
        const pagesCount = Math.ceil(count / maxPerPage);

        return {
          success: true,
          count: count,
          pagesCount: pagesCount,
          items: items,
        };
      }

      const [items, count]: [MessageMetaEntity[], number] = await MessageMetaEntity.findAndCount({
        skip: maxPerPage * (page - 1),
        take: maxPerPage,
        order: orders,
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

  async addNew(count = 1): Promise<MessageResp> {
    for (let i = 1; i <= count; i++) {
      const messageBody = new MessageBodyEntity();
      Object.assign(messageBody, {
        content: `
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur ultrices dui id condimentum. Phasellus sit amet lorem quis metus mollis tristique quis ut massa. Nullam eleifend malesuada tempus. Donec rhoncus egestas lectus non feugiat. Sed porttitor orci vel urna elementum efficitur. Maecenas ullamcorper odio vel odio rutrum viverra. Donec id eros nec lacus cursus varius. Sed pellentesque at diam a porttitor. Mauris vehicula lacinia facilisis. Aliquam ligula ex, hendrerit sit amet tellus ut, ullamcorper tempus elit. Fusce luctus lorem justo, at ullamcorper turpis aliquam vitae. Phasellus eget leo diam. Duis sit amet diam elit. Pellentesque eu sagittis nulla.</p>
        <h2>Lorem ipsum</h2>
        <ul>
          <li>Lorem ipsum</li>
          <li>dolor sit amet</li>
          <li>consectetur adipiscing elit</li>
        </ul>
        `,
      });
      await messageBody.save();

      const messageMeta = new MessageMetaEntity();
      Object.assign(messageMeta, {
        name: `Wiadomość wygenerowana skryptem- ${i}`,
        type: Math.floor(Math.random() * (3 - 0)) + 0,
        sender: `name${i}@host.com`,
        messageBody: messageBody.id,
      });
      await messageMeta.save();
    }

    return {
      success: true,
    };
  }
}
