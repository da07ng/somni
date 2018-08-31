import { Article } from '../../models';

export default {
  Query: {
    articles: () => {
      return Article.find({}).populate({
        path: 'author'
      });
    },
    article: (obj, args, context, info) => {
      return Article.findOne({ _id: args.id }).populate({
        path: 'author'
      });
    }
  },
  Mutation: {
    async createArticle(_, { title, content }, context, info) {
      const article = new Article({
        title,
        content,
        author: '5b3de3780f1c9121ec2f4d30'
      });

      try {
        let newArticle = await article.save();

        return {
          id: newArticle.id,
          title: newArticle.title,
          content: newArticle.content
        };
      } catch (error) {
        throw new Error(error.errmsg);
      }
    },
    async updateArticle(_, { title, content }, context, info) {
      const article = new Article({ title, content });

      try {
        let newArticle = await article.save();

        return {
          id: newArticle.id,
          title: newArticle.title,
          content: newArticle.content
        };
      } catch (error) {
        throw new Error(error.errmsg);
      }
    }
  }
};
