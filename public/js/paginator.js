console.log('paginator vinculado');
const $ = (el) => document.querySelector(el);
const btnPrev = $("#btn-prev");
const btnNext = $("#btn-next");
const containerItemsPage = $("#container-items-page");
const containerProductosCard = document.getElementById("container-productos-card");
console.log(containerProductosCard);
let pageActive = 1;
const apiGetProductos = "http://localhost:3000/api/productos";

const getProductos = ({ page = 1 } = {}) =>
  fetch(`${apiGetProductos}?page=${page}`).then((res) => res.json());

const paintProductos = (productos) => {
  containerProductosCard.innerHTML = "";
  productos.forEach(({ id, image, title, description, price }) => {
    const template = 
    `<div class="card col-md-8">
    <a href=/productos/productDetail/${id}>
    <img src="/images/productos/${image.name || 'imageNull.jpeg'}" alt="Imagen del producto" class="card-img-top">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <h6 class="card-subtitle mb-2 text-muted">$ ${price}</h6>
        <button href="/productos/productDetail/${id} " class="main__article_buton">Ver detalles</button>
        </a>
</div>`
    containerProductosCard.innerHTML += template;


  });
};

const getPage = async (page) => {
  pageActive = page;
  const { data: pages, currentPage, productos } = await getProductos({ page });
  paintProductos(productos);
  paintItemsPage({ numberPages: pages, itemActive: currentPage });
  statusPrevAndNext({ currentPage, pages })
};

const paintItemsPage = ({ numberPages, itemActive }) => {
  containerItemsPage.innerHTML = "";
  for (let i = 1; i <= numberPages; i++) {
    containerItemsPage.innerHTML += `<li class="page-item ${itemActive === i && "active"}">
    <button class="page-link" onclick="getPage(${i})">${i}</button></li>
    `;
  }
};

const statusPrevAndNext = ({ currentPage, pages }) => {
  if (currentPage === pages) {
    btnNext.hidden = true;
  } else {
    btnNext.hidden = false;
  }

  if (currentPage === 1) {
    btnPrev.hidden = true;
  } else {
    btnPrev.hidden = false;
  }
};

window.addEventListener("load", async () => {
  try {
    const { data: { pages, currentPage, productos } } = await getProductos();
    paintProductos(productos);
    paintItemsPage({ numberPages: pages, itemActive: currentPage });
    statusPrevAndNext({ currentPage, pages });
  } catch (error) {
    console.log(error);
  }
});

/* const handleEventPrevNext = (btnElement, { isNext = false } = {}) => {
  btnElement.addEventListener("click", async () => {
    try {
      const { data: pages, currentPage, productos } = await getProductos({
        page: isNext ? ++pageActive : --pageActive
      });
      paintProductoss(productos);
      paintItemsPage({ numberPages: pages, itemActive: currentPage });
      statusPrevAndNext({ currentPage, pages });
    } catch (error) {
      console.log(error);
    }
  });
};

handleEventPrevNext(btnNext, { isNext: true });
handleEventPrevNext(btnPrev); */


btnNext.addEventListener("click", async () => {
  try {
    const {
      data: { pages, currentPage, productos },
    } = await getProductos({ page: ++pageActive });
    paintProductos(productos);
    paintItemsPage({ numberPages: pages, itemActive: currentPage });
    statusPrevAndNext({ currentPage, pages });
  } catch (error) {
    console.log(error);
  }
});

btnPrev.addEventListener("click", async () => {
  try {
    const {
      data: { pages, currentPage, productos },
    } = await getProductos({ page: --pageActive });
    paintProductos(productos);
    paintItemsPage({ numberPages: pages, itemActive: currentPage });
    statusPrevAndNext({ currentPage, pages });
  } catch (error) {
    console.log(error);
  }
}); 