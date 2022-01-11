import { EntityRepository, Repository } from 'typeorm';

import { Calendar } from './entities/calendar.entity';

@EntityRepository(Calendar)
export class CalendarRepository extends Repository<Calendar> {
  //   async findOne(id: number) {
  //     const query = this.createQueryBuilder('calendar').leftJoinAndSelect(
  //       'calendar.users',
  //       'users',
  //     );
  //     if (options.categoryName)
  //       query.andWhere('category.name = :name', { name: options.categoryName });
  //     return query.getOne();
  //   }
}
