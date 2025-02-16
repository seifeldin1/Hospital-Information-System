"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongooseSequence = require("mongoose-sequence")(mongoose_1.default);
const userSchema = new mongoose_1.default.Schema({
    userID: {
        type: Number,
        unique: true
    },
    FirstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    SecondName: {
        type: String,
        required: [true, "Second Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        validate: [validator_1.default.isEmail, "Invalid email format"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["admin", "doctor", "patient"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["male", "female"]
    },
    phone: {
        type: Number,
        required: [true, "Phone is required"]
    },
    birthDate: {
        type: Date,
        required: [true, "Birth date is required"]
    },
});
// Define a virtual property for 'name'
userSchema.virtual('name').get(function () {
    return `${this.FirstName} ${this.SecondName}`;
});
// Ensure virtual fields are serialized
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });
userSchema.plugin(mongooseSequence, { inc_field: "userID" });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        next();
    });
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
