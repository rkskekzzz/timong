import { Router } from 'express';

import {
  CalendarController,
  UserController,
  ScheduleController,
} from '../controllers';

const router: Router = Router();

// π μΊλ¦°λ λΌμ°ν°
router.post('/', CalendarController.create);
router.get('/:calendar_id', CalendarController.getOne);
router.put('/:calendar_id', CalendarController.updateMeetingDays);

// πββοΈ μ μ  λΌμ°ν°
router.post('/:calendar_id/users', UserController.create);
router.put('/:calendar_id/users', UserController.update);
router.delete('/:calendar_id/users/:user_id', UserController.remove);

// π μ€μΌμ₯΄ λΌμ°ν°
router.post('/:calendar_id/users/:user_id/schedule', ScheduleController.update);

export default router;
