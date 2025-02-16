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
exports.getAllDoctors = exports.getDoctor = exports.deleteDoctor = exports.addDoctor = exports.editDoctorInfo = void 0;
const doctor_model_1 = __importDefault(require("../Models/doctor.model"));
const editDoctorInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { birthDate, email, phoneNumber } = req.body;
        const doctorId = req.params.doctorID;
        if (!doctorId)
            return res.status(400).json({ message: "Doctor ID is required" });
        const updateFields = {};
        if (email) {
            const existingDoctor = yield doctor_model_1.default.findOne({ email: email });
            if (existingDoctor && existingDoctor.doctorID.toString() !== doctorId)
                return res.status(400).json({ message: "Email is already in use" });
            updateFields.email = email;
        }
        if (phoneNumber) {
            const existingDoctor = yield doctor_model_1.default.findOne({ phone: phoneNumber });
            if (existingDoctor && existingDoctor.doctorID.toString() !== doctorId)
                return res.status(400).json({ message: "Phone Number is already in use" });
            updateFields.phone = phoneNumber;
        }
        if (birthDate)
            updateFields.birthDate = birthDate;
        const updatedDoctor = yield doctor_model_1.default.findOneAndUpdate({ doctorID: doctorId }, updateFields, { new: true });
        if (!updatedDoctor)
            return res.status(404).json({ message: "Doctor not found" });
        res.status(200).json({ message: "Doctor Info Updated Successfully", data: updatedDoctor });
    }
    catch (err) {
        next(err);
    }
});
exports.editDoctorInfo = editDoctorInfo;
const addDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dEmail, phoneNumber, birthDate, Fname, Lname, gender, expLevel, password } = req.body;
        if (!dEmail)
            return res.status(400).json({ message: "Email is required" });
        if (!phoneNumber)
            return res.status(400).json({ message: "Phone Number is required" });
        if (!Fname)
            return res.status(400).json({ message: "First Name is required" });
        if (!Lname)
            return res.status(400).json({ message: "Last Name is required" });
        if (!gender)
            return res.status(400).json({ message: "Gender is required" });
        if (!expLevel)
            return res.status(400).json({ message: "Expertise Level is required" });
        if (!password)
            return res.status(400).json({ message: "Password is required" });
        if (password.length < 8)
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        const existingEmail = yield doctor_model_1.default.findOne({ email: dEmail });
        if (existingEmail)
            return res.status(400).json({ message: "Email is already in use" });
        const existingPhone = yield doctor_model_1.default.findOne({ phone: phoneNumber });
        if (existingPhone)
            return res.status(400).json({ message: "Phone Number is already in use" });
        const newDoctor = new doctor_model_1.default({
            email: dEmail,
            phone: phoneNumber,
            birthDate: birthDate,
            FirstName: Fname,
            LastName: Lname,
            gender: gender,
            ExpertiseLevel: expLevel,
            password: password,
            role: "Doctor",
        });
        const doctor = yield newDoctor.save();
        return res.status(201).json({
            message: "Doctor Added Successfully",
            doctor: doctor,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.addDoctor = addDoctor;
const deleteDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.doctorID;
        const doctor = yield doctor_model_1.default.findOneAndDelete({ doctorID: id });
        if (!doctor)
            return res.status(404).json({ message: "Doctor not found" });
        return res.status(200).json({ message: "Doctor Deleted Successfully" });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteDoctor = deleteDoctor;
const getDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.doctorID;
        const doctor = yield doctor_model_1.default.findOne({ doctorID: id });
        if (!doctor)
            return res.status(404).json({ message: "Doctor not found" });
        return res.status(200).json({ doctor: doctor });
    }
    catch (err) {
        next(err);
    }
});
exports.getDoctor = getDoctor;
const getAllDoctors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctor_model_1.default.find();
        return res.status(200).json({ doctors: doctors });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllDoctors = getAllDoctors;
