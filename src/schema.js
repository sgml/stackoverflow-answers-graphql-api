
const { makeExecutableSchema } = require('graphql-tools');
const { resolvers } = require('./resolvers');

const typeDefs = `

    scalar Date

    type Question {
      tags: [String]                # "!" denotes a required field
      owner: Owner
      is_answered: Boolean
      view_count: Int
      answer_count: Int
      score: Int
      last_activity_date: Date
      creation_date: Date
      last_edit_date: Date
      question_id: ID!
      link: String
      title: String
      
    }

    type Owner {
      reputation: Int
      user_id: ID!
      user_type: String
      accept_rate: Int
      profile_image: String
      display_name: String
      link: String 
    }
    
    type Query {
      questions(tagged: String!, limit: Int, sort: String, score: Int): [Question]
    }
    
    `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports =  schema ;