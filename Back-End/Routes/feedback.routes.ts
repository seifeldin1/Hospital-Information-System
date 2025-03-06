import { Router } from "express";
import { feedbackController } from "../Controllers/feedback.controller";
import verifyToken from "../Middleware/verifyToken";
import verifyRole from "../Middleware/verifyRole";
import verifyAuthorFB from "../Middleware/verifyAuthorFB";

const router = Router();

router.post("/",verifyToken,verifyRole(["Patient"]), feedbackController.createFeedback);
router.get("/get-all-feedbacks", verifyToken, feedbackController.getFeedback);
router.delete("/delete-feedback/:id",verifyToken,verifyRole(["Admin","Patient"]),verifyAuthorFB(),feedbackController.deleteFeedback)

export default router;
