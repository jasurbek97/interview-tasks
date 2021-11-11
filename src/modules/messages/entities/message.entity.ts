import { Column, Entity, ManyToOne } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { UserEntity } from '../../users/entities/user.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({
  name: 'messages',
})
export class MessageEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  text: string;

  @Column({ type: 'varchar', length: 255 })
  filePath: string;

  @Column({ type: 'timestamp', nullable: true })
  sentAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date | null;

  @ManyToOne(() => UserEntity)
  sender: UserEntity;

  @ManyToOne(() => UserEntity)
  receiver: UserEntity;

  toJSON() {
    return classToPlain(this);
  }
}
