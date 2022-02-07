(function () {
  let currentPage = 1;
  const maxPagLenght = 5;

  document.addEventListener("DOMContentLoaded", async () => {
    let pages = await getPagesNumber();
    createListItem(1, pages);
  });

  function pageButtons(pages) {
    let wrapper = document.getElementById("pagination-wrapper");
    wrapper.innerHTML = "";

    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active");
    });

    let maxLeft = currentPage - Math.floor(maxPagLenght / 2);
    let maxRight = currentPage + Math.floor(maxPagLenght / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = maxPagLenght;
    }

    if (maxRight > pages) {
      maxLeft = pages - (maxPagLenght - 1);

      if (maxLeft < 1) {
        maxLeft = 1;
      }
      maxRight = pages;
    }

    for (let page = maxLeft; page <= maxRight; page++) {
      wrapper.innerHTML += `<button value=${page} class="page btn">${page}</button>`;
    }

    if (currentPage != 1) {
      wrapper.innerHTML =
        `<button value=${1} class="page btn">&#171; First</button>` +
        wrapper.innerHTML;
    }

    if (currentPage != pages) {
      wrapper.innerHTML += `<button value=${pages} class="page btn">Last &#187;</button>`;
    }

    document.querySelector('button[value="' + currentPage + '"]').classList.add("active");

    document.querySelectorAll(".page").forEach((page) => {
      page.addEventListener("click", () => {
        currentPage = Number(page.value);
        createListItem(currentPage, 70);
      });
    });
  }

  async function createListItem(pageID, numberOfPages) {
    const list = document.querySelector(".list");

    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    let articlesInfo = await getArticles(pageID);
    let count = articlesInfo.length;

    for (let i = 0; i < count; i++) {
      let listItem = document.createElement("li");
      let link = document.createElement("a");

      listItem.className = "list-item";
      link.className = "article-link";
      link.innerHTML = `${articlesInfo[i].title}(post.html?id=${articlesInfo[i].id})`;
      link.id = articlesInfo[i].id;
      link.href = "post.html";

      link.addEventListener('click', () => {
        link.href = `post.html?id=${articlesInfo[i].id}`;
      })

      list.append(listItem);
      listItem.append(link);
    }

    pageButtons(numberOfPages);
  }

  async function getPagesNumber() {
    const response = await fetch(`https://gorest.co.in/public-api/posts?page`);
    const data = await response.json();
    return data.meta.pagination.pages;
  }

  async function getArticles(pageID) {
    const response = await fetch(
      `https://gorest.co.in/public-api/posts?page=${pageID}`
    );
    const data = await response.json();
    return data.data;
  }

})();
