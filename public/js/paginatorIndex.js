const $ = (el) => document.querySelectorAll(el);
const btnPrev = $("#btn-prev");
const btnNext = $("#btn-next");
const containerItemsPage = $("#container-items-page");
const containerNewestCard = document.querySelector("#container-newest-card");
const idUser = document.body.getAttribute("data-idUser");
const URL_API_SERVER = "http://localhost:3000/api"


let pageActive = 1;
const apiGetNewestProductos = "http://localhost:3000/api/productos/newest";

const getNewestProductos = ({ page = 1 } = {}) =>
  fetch(`${apiGetNewestProductos}?page=${page}`).then((res) => res.json());

const paintProductos = (productos) => {
  containerNewestCard.innerHTML = "";
  productos.forEach(({ id, image, name, description, price, usersFavorites }) => {
    const template =
      `<div class="card col-md-4" style="width:300px; display: flex; justify-content:center">
    <a href=/productos/productDetail/${id}>
    <img src="/images/productos/${image[0].name || 'imageNull.jpeg'}" alt="Imagen del producto" class="card-img-top">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${description}</p>
        <h6 class="card-subtitle mb-2 text-muted">$ ${price}</h6></a>
        <i class="text-primary p-1 my-2 fs-4 ${usersFavorites.some(({ id }) => id === +idUser) ? 'fas' : 'far'} fa-heart" style="cursor:pointer" onclick="toggleFavorite(${id}, event)"></i>       
        <button class="main__article_buton" onclick="addProductToCart(${id})">Agregar a carrito</button>
</div>`
    containerNewestCard.innerHTML += template;


  });
};

const getPage = async (page) => {
  pageActive = page;
  const { data: { pages, currentPage, productos } } = await getNewestProductos({ page });
  paintProductos(productos);
  paintItemsPage({ numberPages: pages, itemActive: currentPage });
  statusPrevAndNext({ currentPage, pages });
};

const paintItemsPage = ({ numberPages, itemActive }) => {
  containerItemsPage.forEach((container) => {
    container.innerHTML = "";
    for (let i = 1; i <= numberPages; i++) {
      container.innerHTML += `<li class="page-item ${itemActive === i && "active"}"><a href="#container-items-page" class="page-link" onclick="getPage(${i})">${i}</a></li>`;
    }
  })

};

const statusPrevAndNext = ({ currentPage, pages }) => {
  btnNext.forEach((btn) => {
    if (currentPage === pages) {
      btn.hidden = true;
    } else {
      btn.hidden = false;
    }
  })

  btnPrev.forEach((btn) => {
    if (currentPage === 1) {
      btn.hidden = true;
    } else {
      btn.hidden = false;
    }
  })
};

window.addEventListener("load", async () => {
  try {
    const { data: { pages, currentPage, productos } } = await getNewestProductos();
    paintProductos(productos);
    paintItemsPage({ numberPages: pages, itemActive: currentPage });
    statusPrevAndNext({ currentPage, pages });
  } catch (error) {
    console.log(error);
  }
});

btnNext.forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      const {
        data: { pages, currentPage, productos },
      } = await getNewestProductos({ page: ++pageActive });
      paintProductos(productos);
      paintItemsPage({ numberPages: pages, itemActive: currentPage });
      statusPrevAndNext({ currentPage, pages });
    } catch (error) {
      console.log(error);
    }
  });
})


btnPrev.forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      const {
        data: { pages, currentPage, productos },
      } = await getNewestProductos({ page: --pageActive });
      paintProductos(productos);
      paintItemsPage({ numberPages: pages, itemActive: currentPage });
      statusPrevAndNext({ currentPage, pages });
    } catch (error) {
      console.log(error);
    }
  });
})


/* const addProductToCart = async (id) => {
  try {
    const objProductId = {
      idProduct: id,
    };
    const { ok } = await fetch(`${URL_API_SERVER}/cart/addProduct`, {
      method: "POST",
      body: JSON.stringify(objProductId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    await Swal.fire({
      title: ok ? "Producto agregado al carrito" : "Lo sentimos, debes iniciar sesión",
      icon: ok ? "success" : "warning",
      showConfirmButton: false,
      timer: 1200,
    });

    !ok && (location.href = "/users/login");
  } catch (error) {
    console.log(error);
  }
};

const getFavorites = () => {
  return fetch('http://localhost:3000/api/favorites').then((res) => res.json());
};

const toggleFavorite = async (id,{target}) => {
  try {
    if (!idUser) { await Swal.fire({
      title: "Debes iniciar sesión para continuar!",
      icon: "info",
      timer: 1000,
      showConfirmButton:false,
    });
    location.href= "/users/login"
    return
  }
      const objProductId = {idProduct: id};
      const { ok, data: {isRemove}} = await fetch('http://localhost:3000/api/favorites/toggle', {
        method: "POST",
        body: JSON.stringify(objProductId),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (!isRemove) {
        target.classList.add("fas");
      target.classList.remove("far");
    } else {
      target.classList.add("far");
      target.classList.remove("fas");
    }
    
  } catch (error) {
    console.log(error);
  }
}; */