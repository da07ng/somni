import { Article } from '../../models';

// 保存info信息
export const saveArticle = async (ctx, next) => {
  // 获取请求的数据
  const opts = ctx.request.body;

  const article = new Article({
    title: opts.title,
    content: opts.content,
    author: '5b3de3780f1c9121ec2f4d30'
  });
  const saveArticle = await article.save(); // 保存数据
  console.log(saveArticle);
  // 简单判断一下 是否保存成功，然后返回给前端
  if (saveArticle) {
    ctx.body = {
      success: true,
      article: saveArticle
    };
  } else {
    ctx.body = {
      success: false
    };
  }
};

// 获取所有的info数据
export const fetchArticle = async (ctx, next) => {
  const infos = await Article.find({}); // 数据查询

  if (infos.length) {
    ctx.body = {
      success: true,
      article: infos
    };
  } else {
    ctx.body = {
      success: false
    };
  }
};
