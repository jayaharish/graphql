import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { Author } from "./Author";
import { authors } from "./db";

export const Book: GraphQLObjectType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: Author,
            args: {
                bookid: {type: GraphQLInt}
            },
            resolve({id}) {
                return authors.find(author=>author.id === id);
            }
        },
    })
})