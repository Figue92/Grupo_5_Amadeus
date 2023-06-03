const $ = (el) => document.querySelector(el)
const cardsContainer = $('#card-box-container')
const clearCart = $('#clear-cart')
const btnBuy = $('#btn-buy')
const outputTotal = $('#output-total')
const URL_API_SERVER = 'http://localhost:3000'

const getOrder = () => {
  return fetch(`${URL_API_SERVER}/api/cart/getOrderPending`, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())

}
const convertFormatPeso = (n) =>
  n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

const pintarTotal = (n) => {
  outputTotal.textContent = convertFormatPeso(n)
}

const pintarProducts = ({ products }) => {
  cardsContainer.innerHTML = "";

  if (products.length) {
    products.forEach(({ id, price, discount, name, description, image, Cart }) => {
      const priceCalc = discount ? price - (price * discount) / 100 : price;
      const priceARG = convertFormatPeso(priceCalc)
      const template = `
      <div class="card-cart">
      <div class="card-cart-body">
        <img class="col-4" src="/images/productos/${image[0].name}" alt="Imagen Producto">
        <div class="col-8 position-relative">
          <button onclick="removeProductFromCart(${id})"
            class="fs-5 p-0 border-0 bg-transparent position-absolute text-danger " style="top:-3px;right:10px"><i
              style="padding:2px" class="rounded-circle btn-clear far fa-times-circle"></i></button>
  
  
          <h5 class="card-title">${name}</h5>
          <p class="card-text col-lg-10 text-truncate">${description}</p>
          <h5 class="card-text text-black">${priceARG} ${discount ? `<span>${discount}%OFF</span>` : ""}</h5>
          <p class="d-flex align-items-center gap-2">
            <button onclick="lessProduct(${id},${Cart.quantity})" class="btn btn-light">-</button>
            <output style="width:50px" class="form-control text-center">
              ${Cart.quantity}
            </output>
            <button class="btn btn-light" onclick="moreProduct(${id})">+</button>
            <a href="/productos/productDetail/${id}" class="btn btn-primary">Ver más</a>
          </p>
        </div>
      </div>
    </div>`;
      cardsContainer.innerHTML += template;
    }
    )
    return
  }
  cardsContainer.innerHTML = "<h1>Tu carrito aún está vacío!</h1>";
}

window.addEventListener('load', async () => {

  try {
    const { ok, data } = await getOrder();
    if (ok) {
      pintarProducts({ products: data.cart })
      pintarTotal(data.total);
    }

    console.log({ ok, data });
  } catch (error) {
    console.log(error);
  }
});

const moreProduct = async (id) => {
  const objProductId = { idProduct: id };
  const { ok } = await fetch(`${URL_API_SERVER}/api/cart/moreQuantity`, {
    method: "PUT",
    body: JSON.stringify(objProductId),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  if (ok) {
    const { ok, data } = await getOrder();
    if (ok) {
      pintarProducts({ products: data.cart });
      pintarTotal(data.total);
    }
  }
};
const lessProduct = async (id, quantity) => {
  const objProductId = {
    idProduct: id,
  };

  if (quantity > 1) {
    const { ok } = await fetch(`${URL_API_SERVER}/api/cart/lessQuantity`, {
      method: "PUT",
      body: JSON.stringify(objProductId),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (ok) {
      const { ok, data } = await getOrder();
      if (ok) {
        pintarProducts({ products: data.cart });
        pintarTotal(data.total);
      }
    }
  }
};
const removeProductFromCart = async (id) => {
  try {
    const result = await Swal.fire({
      title: "Ya casi es tuyo! ¿Estas seguro de eliminar el producto del carrito?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    })
    if (result.isConfirmed) {
      const objProductId = {
        idProduct: id
      }
      const { ok } = await fetch(`${URL_API_SERVER}/api/cart/removeProduct`, {
        method: "DELETE",
        body: JSON.stringify(objProductId),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (ok) {
        const { ok, data } = await getOrder();
        if (ok) {
          pintarProducts({ products: data.cart })
          pintarTotal(data.total)
        }

        Swal.fire({
          title: "Producto eliminado",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
clearCart.addEventListener("click", async () => {
  try {
    const result = await Swal.fire({
      title: "¿Estas seguro de vaciar tu carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Vaciar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    })
    if (result.isConfirmed) {
      const { ok } = await fetch(`${URL_API_SERVER}/api/cart/clearCart`, {
        method: "DELETE",
      }).then((res) => res.json());

      if (ok) {
        const { ok, data } = await getOrder();
        if (ok) {
          pintarProducts({ products: data.cart })
          pintarTotal(data.total)
        }
        Swal.fire({
          title: "Proceso completado",
          icon: "success",
          showConfirmButton: false,
          timer: 1400,
        })
      }
    }

  } catch (error) {
    console.log(error);
  }
})
btnBuy.addEventListener("click", async () => {
  const result = await Swal.fire({
    title: "¿Quieres confirmar la compra?",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Comprar",
    cancelButtonText: "Cancelar",
  });
  if (result.isConfirmed) {
    const { ok } = await fetch(`${URL_API_SERVER}/api/cart/statusOrder`, {
      method: "PUT",
      body: JSON.stringify({ status: "completed" }),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.json());

    let timerInterval;
    const result = await Swal.fire({
      title: "¡Confirmaste tu pedido!",
      text: "Espera mientras procesamos la venta",
      timer: 6000,
      timerProgressBar: true,
      showCancelButton: true,
      cancelButtonText: "Cancelar proceso",
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 200);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    })
    if (result.dismiss === Swal.DismissReason.timer) {

      await Swal.fire({
        title: ok ? "Gracias por tu compra" : "Lo sentimos, hubo un error",
        icon: ok ? "success" : "error",
        showConfirmButton: false,
        timer: 2000,
      })
      ok && (location.href = "/")
    }
  }
})

