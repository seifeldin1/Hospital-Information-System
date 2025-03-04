import { Router } from "express";
import { feedbackController } from "../Controllers/feedback.controller";

const router = Router();

router.post("/", feedbackController.createFeedback);
router.get("/", feedbackController.getFeedback);
router.delete("/delete-feedback/:id",feedbackController.deleteFeedback)

export default router;
