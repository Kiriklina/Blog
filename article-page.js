(function () {

  document.addEventListener("DOMContentLoaded", async () => {
    const pageID = (new URLSearchParams(window.location.search)).get('id');

    const container = document.querySelector(".container");

    const article = await getArticle(pageID);
    const comments = await getArticleComments(pageID);

    createArticlePage(article.data, container);

    if (comments.lenght > 0) {
      createArticleComments(comments, container, true);
    } else {
      createArticleComments(comments, container, false);
    }

  });

  function createArticlePage(articleData, articleContainer) {
    const header = document.createElement("h1");
    const articleBody = document.createElement("p");

    header.className = "article-title";
    header.innerHTML = articleData.title;
    articleBody.className = "article-body";
    articleBody.innerHTML = articleData.body;

    articleContainer.append(header);
    articleContainer.append(articleBody);
  }

  function createArticleComments(commentsData, articleContainer, articleHasComments) {
    const commentsContainer = document.createElement("div");
    commentsContainer.className = "comments-container";
    const commentsList = document.createElement("ul");
    commentsList.className = "comments-list";

    if (articleHasComments) {

      for (let i = 0; i < commentsData.lenght; i++) {
        const commentContainer = document.createElement("li");
        const commentAuthor = document.createElement("p");
        const commentText = document.createElement("p");


        commentContainer.className = "comment-item";
        commentAuthor.className = "comment-author";
        commentAuthor.innerHTML = commentsData.name;
        commentText.className = "comment-text";
        commentText.innerHTML = commentsData.body;

        commentContainer.append(commentAuthor);
        commentContainer.append(commentText);

        commentsList.append(commentContainer);
      }
    } else {
      const commentContainer = document.createElement("li");

      commentContainer.className = "comment-item";
      commentContainer.innerHTML = 'There is no comments yet';

      commentsList.append(commentContainer);
    }

    commentsContainer.append(commentsList);
    articleContainer.append(commentsContainer);
  }

  async function getArticle(articleID) {
    const response = await fetch(`https://gorest.co.in/public-api/posts/${articleID}`);
    const data = await response.json();

    return data;
  }

  async function getArticleComments(articleID) {
    const response = await fetch(`https://gorest.co.in/public/v1/comments?post_id=${articleID}`);
    const data = await response.json();

    return data;
  }

})();
