import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from 'typeorm';
import { Calendar } from 'src/calendar/entities/calendar.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 40, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 40, nullable: false })
  color!: string;

  @Column({ nullable: false })
  @Index('ix_calendar_id')
  calendar_id!: number;

  @ManyToOne(() => Calendar, (calendar) => calendar.users, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'calendar_id', referencedColumnName: 'id' })
  calendar?: Calendar;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
