import { GraphQLError } from "graphql";
import { ContactModelType, ContactModel } from "../db/contact.ts"

export const Mutation = {

    addContact : async(
        _: unknown,
        args: {name : string, email : string, number : string}
    ): Promise<ContactModelType> => {
        
        const contact = {
            name : args.name,
            email : args.email,
            number : args.number
        }

        const newContact = await ContactModel.create(contact)
        return newContact
    },

    deleteContact : async(
        _: unknown,
        args : {id : string}
    ): Promise<ContactModelType> => {
        const contact = await ContactModel.findByIdAndDelete(args.id)

        if (!contact){
            throw new GraphQLError (`No contact id ${args.id}`, 
            { extensions : { code : "NO_CONTACT_FOUND"}})
        }

        return contact
    },

    updateContact : async(
        _: unknown,
        args : {id : string, name : string, email : string, number : string, country : string}
    ): Promise<ContactModelType> => {
        const contact = await ContactModel.findByIdAndUpdate(
            args.id,
            { name : args.name, email : args.email, number : args.number, country : args.country},
            { new : true, runValidators : true}
        )

        if (!contact){
            throw new GraphQLError (`No contact id ${args.id}`, 
            { extensions : { code : "NO_CONTACT_FOUND"}})
        }

        return contact
    },

    getContact : async(
        _: unknown,
        args : {id : string}
    ): Promise<ContactModelType> => {
        const contact = await ContactModel.findById(args.id)

        if (!contact){
            throw new GraphQLError (`No contact id ${args.id}`, 
            { extensions : { code : "NO_CONTACT_FOUND"}})
        }

        return contact
    },

    getContacts : async(): Promise<ContactModelType[]> => {
        const contacts = await ContactModel.find().exec()
        return contacts
    }
}