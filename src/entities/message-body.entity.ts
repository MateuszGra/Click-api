import { Entity, BaseEntity, Index, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { MessageBody } from '../interfaces/message-body';
import { MessageMetaEntity } from './message-meta.entity';

@Entity()
export class MessageBodyEntity extends BaseEntity implements MessageBody {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({
    type: 'longtext',
  })
  content: string;

  @OneToOne((type) => MessageMetaEntity, (entity) => entity.messageBody)
  messageMeta: MessageMetaEntity;
}
