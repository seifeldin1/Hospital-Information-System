import mongoose , {Schema , Document} from 'mongoose';
import User, {IUser} from './user.model';
const mongooseSequence = require("mongoose-sequence")(mongoose); 

interface IDoctor extends IUser{
    ExpertiseLevel: number
    doctorID: number
}

const doctorSchema: Schema = new Schema({
    ExpertiseLevel:{
        type: Number,
        required: [true , "Expertise level is required"],
        min: [1 , "Expertise level must be at least 1"],
    },
    doctorID: { 
        type: Number, 
        unique: true 
    } 
})
doctorSchema.plugin(mongooseSequence, { inc_field: "doctorID" })
const Doctor = User.discriminator<IDoctor>("Doctor" , doctorSchema)
export default Doctor
