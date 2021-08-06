import { MessageBodyEntity } from '../entities/message-body.entity';

export interface MessageMeta {
  id: string;
  name: string;
  type: number;
  date: Date;
  sender: string;
  messageBody: MessageBodyEntity;
}
