const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-1',
    description: 'test link',
    url: 'www.notaurl.com'
  }
];
const typeDefs = ` 
type Query {
  info: String!,
  feed: [Link!]!
}

type Link {
  id: ID!,
  description: String!,
  url: String!
}
`;

const resolvers = {
  Query: {
    info: () => `This is an API of a HackerNews clone.`,
    feed: () => links
  },

  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`server is running on localhost:4000`));
