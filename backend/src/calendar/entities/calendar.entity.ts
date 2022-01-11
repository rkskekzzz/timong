import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

export enum CalendarType {
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}

@Entity('calendar')
export class Calendar {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: CalendarType, default: CalendarType.MONTHLY })
  type!: string;

  @Column({ type: 'date', nullable: true })
  start?: string;

  @Column({ type: 'date', nullable: true })
  end?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => User, (user) => user.calendar, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  users?: User[];
}
