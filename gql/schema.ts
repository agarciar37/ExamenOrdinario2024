export const typeDefs = `#graphql
    type Contact {
        id : ID!
        name : String!
        email : String!
        number : String!
        country : String!
        time : String!
    }

    type Query {
        contact(id: ID!) : Contact!
        contacts : [Contact!]!
    }

    type Mutation {
        addContact(name : String!, email : String!, numeber : String!) : Contact!
        deleteContact(id : ID!) : Contact!
        getContact(id : ID!) : Contact!
        getContacts : [Contact!]!
        updateContact(id : ID!, name : String, email : String, number : String, country : String): Contact!
    }
`