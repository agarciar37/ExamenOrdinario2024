import mongoose from "mongoose"
import { Contact } from "../types.ts"

const Schema = mongoose.Schema

const contactSchema = new Schema (
    {
        name : { type : String, required : true },
        email : { type : String, required : true, unique : true}, 
        number : { type : String, required : true, unique : true},
        country : { type : String, required : true },
        time : { type : String, required : true}
    }
)

//verificar email
contactSchema.path("email").validate(async(email:string) => {
    const emailCount = await mongoose.models.user.countDocuments({email})
    return !emailCount
}, "An other person has the same email")

//verificar que está en modo email
contactSchema.path("email").validate((email:string) => {
    const emailRegex = /\S+@S+\.\S+/
    return emailRegex
}, "The email is not in the correct form")

//verificar telefono
contactSchema.path("number").validate(async(number:string) => {
    const numberCount = await mongoose.models.user.countDocuments({number})
    return !numberCount
}, "An other person has the same number")

export type ContactModelType = mongoose.Document & Omit<Contact, "id">
export const ContactModel = mongoose.model<ContactModelType>("Contact", contactSchema)