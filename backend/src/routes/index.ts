import { Router } from "express";

import {
  CalendarController,
  UserController,
  TimeController,
} from "../controllers";

const router: Router = Router();

router.post("/", CalendarController.create);
router.get("/:calendar_id", CalendarController.getOne);
router.put("/:calendar_id", CalendarController.update);

router.post("/:calendar_id/users", UserController.create);
router.put("/:calendar_id/users", UserController.update);
router.delete("/:calendar_id/users/:user_id", UserController.remove);

router.post("/:calendar_id/users/:user_id/time", TimeController.create);
router.delete(
  "/:calendar_id/users/:user_id/time/:time_id",
  TimeController.remove
);

export default router;
