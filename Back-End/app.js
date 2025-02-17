"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./Config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_controller_1 = require("./Controllers/error.controller");
const customError_1 = __importDefault(require("./Utils/customError"));
const feedback_routes_1 = __importDefault(require("./Routes/feedback.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, database_1.default)();
app.use(express_1.default.json());
app.use("/feedback", feedback_routes_1.default);
app.all("*", (req, res, next) => {
    next(new customError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(error_controller_1.errorController);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
