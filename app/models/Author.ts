import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { Book } from "./Book";
import { books } from "./db";

export const Author = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: {type: GraphQLInt},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(Book),
            args: {
                bookid: {type: GraphQLInt}
            },
            resolve(_, {bookid}){
                return books.filter(book => book.id === bookid);
            }
        },
        bookid: {
            type: Book,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(_, {id}){
                return books.find(book=>book.id == id);
            }
        }
    })
});
