import express from "express";
import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {graphqlHTTP} from "express-graphql"
import { Author } from "./models/Author";
import { Book } from "./models/Book";
import { authors, books } from "./models/db";
import { makeExecutableSchema } from "@graphql-tools/schema";

const app = express();

// const queryType = new GraphQLObjectType({
//     name: 'Query',
//     fields: () => ({
//         author: {
//             type: Author,
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve(_, args){
//                 const {id} = args;
//                 return authors.find(author=>author.id == id);
//             }
//         },
//         book: {
//             type: Book,
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve(_, args){
//                 const {id} = args;
//                 return books.find(book=>book.id == id);
//             }
//         }
//     })
// })

// const mutation = new GraphQLObjectType({
//     name: 'mutation',
//     fields: {
//         author: {
//             type: Author,
//             args: {
//                 name: {type: GraphQLString},
//                 age: {type: GraphQLInt},
//                 books: {type: new GraphQLList(Book)}
//             },
//             resolve(_, {name, age, books}) {
//                 console.log(books);
//                 const ob = {
//                     id: authors.length+ 1,
//                     name,
//                     age
//                 };
//                 authors.push(ob);
//                 return ob;
//             }
//         },
//         book: {
//             type: Book,
//             args: {
//                 name: {type: GraphQLString},
//                 genre: {type: GraphQLString},
//                 authorId: {type: GraphQLInt}
//             },
//             resolve(_, {name, genre, authorId}) {
//                 console.log(_);
//                 const ob = {
//                     id: authors.length+ 1,
//                     name,
//                     genre,
//                     authorId
//                 };
//                 books.push(ob);
//                 return ob;
//             }
//         }
//     }
// })

// const schema = new GraphQLSchema({query: queryType, mutation})

const typeDefs = `
    type Author{
        id: Int
        name: String
        age: Int
        books: [Book]
        bookByid(id: Int!): Book
    }
    type Book{
        id: Int
        name: String
        genre: String
        author: Author
    }
    type Query{
        authors: [Author]
        books: [Book]
        author(id: Int): Author
        book(id: Int): Book
    }
`

const resolvers = {
    Query: {
        authors: () => authors,
        books: () => books,
        author: (id: number) => authors.find(author => author.id === id),
        book: (id:number) => books.find(book => book.id === id)
    },
    Author: {
        books: (parent: any) => books.filter(book => book.id === parent.id),
        bookByid: (parent:any, {id}:any) => books.find(book => book.authorId === parent.id && book.id === id)
    },
    Book: {
        author: (parent: any) => authors.find(author=> author.id === parent.authorId)
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

app.get('/books',(req,res,next)=>{
    res.status(200).send({
        message: "Hello"
    })
});
app.listen(3000);