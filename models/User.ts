import { Document, Schema, model } from "mongoose";
import {validatePassword,validateEmail} from "../helpers/helper"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

type Location = {
  type: String;
  coordinates: [Number]; // lat,lng
};

interface User extends Document {
  name: String;
  surname: String;
  age?: Number;
  bornAt?: Date; // Birthday
  about?: String;
  location?: Location;
  image: String; //Profile Image
  email: String;
  balance?: Number; // Represents user’s deposited money in the system
  password: String; //(Needs to be hashed),
  phoneNumber: String;
  username: String;
  createdAt: Date;
}


const UserSchema = new Schema<User>({
  name: { type: String, required: [true, "Please provide a name"] },
  surname: { type: String, required: [true, "Please provide a surname"] },
  age: { type: Number },
  bornAt: { type: Date },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  about: { type: String },
  image: { type: String, default: "profile.jpg" },
  email: {
      type: String,
      required: [true, "Please provide a email"],
      unique : true,
      trim: true,
      lowercase: true,
      validate: [validateEmail, 'Please provide a valid password.'],
     },
  balance: {
      type: Number,
      default: 0
    },
  password: {
      type: String,
      required: [true, "Please provide a password"],
      validate: [validatePassword, 'Your password must be at least 8 characters, with at least a symbol, upper and lower case letters and a number.'],
      select: false
    },
  phoneNumber: {
      type: String,
      required: [true, "Please provide a phone number"]
    },
  username: {
      type: String,
      unique : true,
      required: [true, "Please provide a username"]
    },
    createdAt: {
        type: Date, default: Date.now
    }
});

UserSchema.index({ location: "2dsphere" });

UserSchema.methods.generateJwtFromUser = function(){

    const {JWT_SECRET_KEY, JWT_EXPIRE}:any = process.env;

    const payload:any = {
        id : this.id,
        username : this.username
    }

    const token = jwt.sign(payload,JWT_SECRET_KEY,{expiresIn: JWT_EXPIRE})

    return token;
}

UserSchema.pre("save",function(next){


    if(!this.isModified('password')) next()

    bcrypt.genSalt(10, (err, salt) => {
        let password:any = this.password;
        if(err) next(err)
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) next(err)
            this.password = hash
            next();
        });
    });
})

export const UserModel = model<User>("User", UserSchema);
