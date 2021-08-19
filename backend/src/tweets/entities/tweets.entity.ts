import { Common } from 'src/common/common.entity';
import { Users } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Tweets extends Common {
  @Column('varchar')
  tweet: string;

  @ManyToOne(() => Users, (users) => users.tweets, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  users: Users;
}
