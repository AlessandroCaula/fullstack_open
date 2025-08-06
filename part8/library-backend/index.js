const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = `
  type Book {
    title: String! 
    author: String!
    published: String!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let filteredBooks = books
      // Check the the author is given as the argument
      if (args.author) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author)
      }
      // Check if also the genre is given as argument
      if (args.genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre))
      }
      // Return the filtered books
      return filteredBooks
    },
    allAuthors: () => authors
  },  
  // Adding a field-resolver for Author.bookCount. 
  // This means that when GraphQL receives a request for bookCount on an author, it will use this resolver to compute it.
  Author: {
    bookCount: (root) => {
      // For each Author returned from allAuthors this runs and counts how many books have .author equal to author's name
      return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    // Resolver for the addBook mutation
    addBook: (root, args) => {
      // Create a new book object using the provided arguments
      // Add a unique ID to it using uuid()
      const newBook = {
        ...args, 
        id: uuid()
      }
      // Add the new book to the 'books' collection (stored in memory)
      books = books.concat(newBook)

      // check if the book's author already exists in the authors collection
      const authorExists = authors.some(author => author.name === args.author)
      // If the author does not already exist, create and add them
      if (!authorExists) {
        const newAuthor = {
          name: args.author,
          id: uuid(),   // Generate a unique ID for the author
          born: null    // No birth year is provided at this point
        }
        // Add the new author to the authors collection
        authors = authors.concat(newAuthor)
      }

      // Return the newly created book. This will be sent as the response to the mutation
      return newBook
    },
    editAuthor: (root, args) => {
      // Retrieve the author that we want to modify
      const author = authors.find(a => a.name === args.name)
      // If no author is find, then return null
      if (!author) {
        return null
      }
      // Otherwise update the author born date
      const updateAuthor = { ...author, born: args.born }
      // Add it to to the author collection
      authors = authors.map(a => a.name === args.name ? updateAuthor : p)
      // Return the updated author
      return updateAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})