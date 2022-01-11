import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { CalendarRepository } from './calendar.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarRepository])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
