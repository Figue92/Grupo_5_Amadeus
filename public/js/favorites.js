console.log("Favoritos vinculado!");
const cardContainer = document.querySelector('#cards-container');
const URL_API_SERVER = "http://localhost:3000/api";

const getFavorites = () => {
    return fetch('http://localhost:3000/api/favorites').then((res)=> res.json());

}

const convertFormatPeso = (n)=> n.toLocaleString("es-Ar",{style: "currency", currency:"ARS"});

const paintProducts = ({ productos}) => {
cardContainer.innerHTML= "";
if(productos){
    productos.forEach(({name, discount, price,id,image,description})=>{
        const priceWithDiscount = discount ? price -(price * discount)/100 : price;
        const priceFormatARG = convertFormatPeso(priceWithDiscount)
        const template = `
      
        <div class="cardsFav"><div class="d-flex" style="top:20px;rigth:10px;font-size:20px">
        <i class="text-primary p-0 border-0 bg-transparent position-absolute fs-5 fas fa-heart" style="cursor:pointer" onclick="toggleFavorite(${id})"></i>
       </div>
        <img src="/images/productos/${image[0].name || 'imageNull.jpeg'}" alt="Imagen del producto" class="card-img-top">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
            <h6 class="card-subtitle mb-2 text-muted">${priceFormatARG} ${
                discount ? `<span class="text-danger mx-3">${discount}% OFF</span>` : ""
              }</h6>
              <div class="fav_containerbutons">
            <button href="/productos/productDetail/${id}" class="fav_buton">Ver detalles</button>
                          <button class="fav_buton" onclick="addProductToCart(${id})">Agregar Carrito</button></div>

    </div>
        `
        cardContainer.innerHTML += template;
    })
return
}
cardContainer.innerHTML = "<h1>Aún no tenes productos favoritos</h1>"
}

window.addEventListener("load", async () =>{
    try {
     
        const {ok,data} = await getFavorites();
        ok && paintProducts({ productos: data})
    } catch (error) {
        console.log(error)
        
    }
});
const addProductToCart = async (id) =>{
    try {
        const objProductId={
            idProduct: id
        }
        const {ok} = await fetch('http://localhost:3000/api/cart/addProduct',{
            method: "POST",
            body: JSON.stringify(objProductId),
            headers: {
                "Content-Type" : "application/json"
            }
        }).then((res) => res.json())

        await Swal.fire({
            title: ok ? "Producto agregado al carrito!" : "Debes iniciar sesión para continuar",
            icon: ok ? "success" : "warning",
            showConfirmButton: false,
            timer: 1300
        })
        !ok && (location.href = "users/login")
    } catch (error) {
        console.log(error);
    }

}
const toggleFavorite = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Seguro deseas eliminar el producto de favoritos?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "No, Cancelar",
        confirmButtonText: "Si, eliminar",
      });
  
      if (result.isConfirmed) {
        const objProductId = {idProduct: id}
        const { ok } = await fetch('http://localhost:3000/api/favorites/toggle', {
          method: "POST",
          body: JSON.stringify(objProductId),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());
  
        if (ok) {
          const { ok, data } = await getFavorites();
          console.log({ ok, data })
          paintProducts({ productos: data });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };