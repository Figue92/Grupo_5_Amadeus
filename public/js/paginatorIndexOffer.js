const bttnPrev = document.querySelector(".control-prev");
const bttnNext = document.querySelector(".control-next");
const containerOfferCard = document.querySelector("#container-offer-card");
/* const idUser = document.body.getAttribute("data-idUser");
const URL_API_SERVER = "http://localhost:3000/api" */

let firstProducto = 0;
let lastProducto = 4;
const apiGetOfferProductos = "http://localhost:3000/api/productos/offer";

const getOfferProductos = () =>
  fetch(apiGetOfferProductos).then((res) => res.json());

const paintOfferProductos = (productos) => {
  containerOfferCard.innerHTML = "";
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
    containerOfferCard.innerHTML += template;


  });
};

const mostrarSiguiente = (productos) => {
  firstProducto++;
  lastProducto++;
  const siguientes = productos.slice(firstProducto, lastProducto);
  return siguientes;
}

const mostrarAnterior = (productos) => {
  firstProducto--;
  lastProducto--;
  const siguientes = productos.slice(firstProducto, lastProducto);
  return siguientes;
}

const statusPrevAndNextOffer = (count) => {
  if (lastProducto === count) {
    bttnNext.disabled = true;
  } else {
    bttnNext.disabled = false;
  }

  if (firstProducto === 0) {
    bttnPrev.disabled = true;
  } else {
    bttnPrev.disabled = false;
  }
};

window.addEventListener("load", async () => {
  try {
    const { data: { count, productos } } = await getOfferProductos();
    productos.sort((a, b) => a.id - b.id);
    paintOfferProductos(productos.slice(firstProducto, lastProducto));
    statusPrevAndNextOffer(count);
  } catch (error) {
    console.log(error);
  }
});


bttnNext.addEventListener("click", async () => {
  try {
    const { data : {count, productos}} = await getOfferProductos();
    const siguientes = mostrarSiguiente(productos);
    paintOfferProductos(siguientes);
    statusPrevAndNextOffer(count);
  } catch (error) {
    console.log(error);
  }
});




bttnPrev.addEventListener("click", async () => {
  try {
    const { data : {count, productos}} = await getOfferProductos();
    const anteriores = mostrarAnterior(productos);
    paintOfferProductos(anteriores);
    statusPrevAndNextOffer(count);
  } catch (error) {
    console.log(error);
  }
});



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