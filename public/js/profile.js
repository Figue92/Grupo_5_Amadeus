const $ = (el) => document.querySelector(el)
const cardsCompra = $('#card-compra')
const URL_API_SERVER = 'http://localhost:3000'

const getOrders = () => {
    return fetch(`${URL_API_SERVER}/api/orders`,{
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

const pintarProductosComprados = ({data}) => {
    console.log({data});
    cardsCompra.innerHTML = "";
    if(data) {
    data.forEach((order) =>{
      order.cart.forEach(({id,price,name,image,discount}) =>{
        const priceCalc = discount ? price - (price * discount) / 100 : price;
        const priceARG = convertFormatPeso(priceCalc)
        const template = `
        <div class="card-cart">
   <div class="card-body row" style="display:flex;justify-content:space-around">
   <img class="col-4" style="width:150px" style="object-fit: contain;" src="/images/productos/${image[0].name}"alt="Imagen Producto">
   <div class="col-8 position-relative">
          <h5 class="card-title">${name}</h5>
          <h5 class="card-text text-black">${priceARG} ${discount ? `<span>${discount}%OFF</span>` : ""}</h5>
        </div>
      </div>
    </div>`;
      cardsCompra.innerHTML += template;
    })
  })
    return
}
 cardsCompra.innerHTML = "<h1> Aún no tenés compras realizadas! </h1>"
}

window.addEventListener('load', async () => {

    try {
      const { ok, data } = await getOrders();
      if (ok) {
        pintarProductosComprados({data})
     
      }
  
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  });
