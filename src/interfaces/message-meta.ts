import { MessageBodyEntity } from '../entities/message-body.entity';
import { MessageMetaEntity } from '../entities/message-meta.entity';

export interface MessageMeta {
  id: string;
  name: string;
  type: number;
  date: Date;
  sender: string;
  messageBody: MessageBodyEntity;
}

export type MessageResp =
  | {
      success: true;
      items?: MessageMetaEntity[];
      count?: number;
      pagesCount?: number;
      id?: string;
    }
  | {
      success: false;
      errors: string[];
    };

export enum MessageFilters {
  date = 'date',
  name = 'name',
  sender = 'sender',
}

export enum MessageOrder {
  asc = 'ASC',
  desc = 'DESC',
}
