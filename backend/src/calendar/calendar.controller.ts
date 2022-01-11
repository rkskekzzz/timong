import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Calendar } from './entities/calendar.entity';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  create(@Body() createCalendarDto: CreateCalendarDto): Promise<Calendar> {
    return this.calendarService.create(createCalendarDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Calendar> {
    return this.calendarService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCalendarDto: UpdateCalendarDto,
  ): Promise<Calendar> {
    return this.calendarService.update(id, updateCalendarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.calendarService.remove(id);
  }
}
