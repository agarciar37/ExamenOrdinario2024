import { GraphQLError } from "graphql";
import { ContactModelType, ContactModel } from "../db/contact.ts"

export const Query = {
    contacts : async() : Promise<ContactModelType[]> => {
        const contacts = await ContactModel.find().exec()
        return contacts
    },

    contact : async(_:unknown, args:{id:string}): Promise<ContactModelType> => {
        const user = await ContactModel.findById(args.id)
        if (!user){
            throw new GraphQLError (`No contact id ${args.id}`, 
            { extensions : { code : "NO_CONTACT_FOUND"}})
        }

        return user
    }
}