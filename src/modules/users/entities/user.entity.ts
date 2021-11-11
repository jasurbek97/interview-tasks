import { Column, Entity, OneToMany } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';
import { classToPlain, Exclude } from 'class-transformer';
import { MessageEntity } from 'src/modules/messages/entities/message.entity';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity implements UserInterface {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  @Exclude()
  password: string;

  @OneToMany(() => MessageEntity, (message) => message.sender, {
    cascade: true,
  })
  messages: MessageEntity[];

  toJSON() {
    return classToPlain(this);
  }
}
