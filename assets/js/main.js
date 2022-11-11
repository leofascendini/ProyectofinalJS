const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const pie = document.getElementById("footer");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((element)=> {

    let content = document.createElement("div");
    content.classList.add("card")
    content.innerHTML = `
    <img onmouseout="this.src='${element.img}';"
          onmouseover="this.src='${element.img2}';" src="${element.img3}" />
        <h4 class="mt-2">${element.nombre}</h4>
        <h5 class="m-4"><b>$${element.precio}</b></h5>
        <button id="${element.id}" class="boton">comprar</button>
    `;
     
    shopContent.append(content)

});

const card=document.querySelectorAll(".card")
    document.addEventListener("click", (evento) => {
        if (evento.target.classList.contains("boton")){
            item = productos.find((productos) => productos.id == evento.target.id);

            const repeat = carrito.some((repeatitem) => repeatitem.id === item.id);
            console.log(repeat)

            if (repeat){
                carrito.map((prod) => {
                    if(prod.id === item.id){
                        prod.cantidad++;
                    }
                });
            } else {
            carrito.push({
                id: item.id,
                nombre:item.nombre,
                precio: item.precio,
                img: item.img,
                cantidad: item.cantidad,
            });
        }
            console.log(carrito);
            console.log(carrito.length);
            carritoCounter();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Agregado al carrito correctamente',
                showConfirmButton: false,
                timer: 1200
              })
            saveLocal();
        }});

const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};





