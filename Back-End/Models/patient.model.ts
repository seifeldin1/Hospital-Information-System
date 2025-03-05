import mongoose , {Schema , Document} from 'mongoose';
import User, {IUser} from './user.model';
const mongooseSequence = require("mongoose-sequence")(mongoose); 

interface IPatient extends IUser{
    patientID: number
}

const patientSchema: Schema = new Schema({
    patientID: { 
        type: Number, 
        unique: true 
    } 
})
patientSchema.plugin(mongooseSequence, { inc_field: "patientID" })
const Patient = User.discriminator<IPatient>("Patient" , patientSchema)
export default Patient
