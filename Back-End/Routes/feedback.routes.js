"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feedback_controller_1 = require("../Controllers/feedback.controller");
const router = (0, express_1.Router)();
router.post("/", feedback_controller_1.feedbackController.createFeedback);
router.get("/", feedback_controller_1.feedbackController.getFeedback);
exports.default = router;
