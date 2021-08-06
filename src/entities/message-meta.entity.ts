import { Entity, BaseEntity, Index, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { MessageMeta } from '../interfaces/message-meta';
import { MessageBodyEntity } from './message-body.entity';

@Entity()
export class MessageMetaEntity extends BaseEntity implements MessageMeta {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({
    length: 300,
  })
  name: string;

  @Column({
    type: 'int',
    precision: 1,
  })
  type: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column({
    length: 300,
  })
  sender: string;

  @OneToOne((type) => MessageBodyEntity, (entity) => entity.messageMeta)
  @JoinColumn()
  messageBody: MessageBodyEntity;
}
