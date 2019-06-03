import models from '../models';

const Article = models.Article;
const User = models.User;

class ArticleService {
  async list() {
    let articles = await Article.findAll({
      attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
        }
      ]
    });

    return articles;
  }

  async create(params) {
    const { title, content } = params;

    let article = {
      title,
      content,
      author: 'HAXDDRTBfIYjNtav9bw'
    };

    let result = await Article.create(article);

    return result;
  }
}

export default new ArticleService();
