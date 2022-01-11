import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { CalendarRepository } from './calendar.repository';
import { Calendar } from './entities/calendar.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarRepository)
    private readonly calendarRepository: CalendarRepository,
  ) {}

  create(createCalendarDto: CreateCalendarDto): Promise<Calendar> {
    const calendar = this.calendarRepository.create(createCalendarDto);

    return this.calendarRepository.save(calendar);
  }

  async findOne(id: number): Promise<Calendar> {
    const calendar = await this.calendarRepository.findOne(id);

    if (!calendar) {
      throw new NotFoundException(`Can't find Calendar with id ${id}`);
    }

    return calendar;
  }

  async update(
    id: number,
    updateCalendarDto: UpdateCalendarDto,
  ): Promise<Calendar> {
    const calendar = await this.findOne(id);

    const new_calendar = {
      ...calendar,
      ...updateCalendarDto,
    };
    return await this.calendarRepository.save(new_calendar);
  }

  async remove(id: number): Promise<void> {
    const result = await this.calendarRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Calendar with id ${id}`);
    }
  }
}
