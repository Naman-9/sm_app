import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    matchPassword (enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, 'Please Provide a Name.'],
    },
    email: {
        type: String,
        required: [true, 'Please Provide an email.']
    },
    password: {
        type: String,
        required: [true, 'Please Provide a password.']
    }
}, {timestamps: true});

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword= async function (enteredPassword:string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);