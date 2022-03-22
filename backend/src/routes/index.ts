import { Router } from 'express';

import {
  CalendarController,
  UserController,
  ScheduleController,
} from '../controllers';

const router: Router = Router();

// 📆 캘린더 라우터
router.post('/', CalendarController.create);
router.get('/:calendar_id', CalendarController.getOne);
router.put('/:calendar_id', CalendarController.updateMeetingDays);

// 🙍‍♂️ 유저 라우터
router.post('/:calendar_id/users', UserController.create);
router.delete('/:calendar_id/users/:user_id', UserController.remove);

// 🎏 스케쥴 라우터
router.post('/:calendar_id/users/:user_id/schedule', ScheduleController.update);

export default router;
