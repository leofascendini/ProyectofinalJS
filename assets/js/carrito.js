const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito</h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
    
    modalHeader.append(modalbutton);

    carrito.forEach((productos) =>{
       let carritoContent = document.createElement("div")
       carritoContent.className = "modal-content"
       carritoContent.innerHTML = `
        <img src="${productos.img}">
        <h4 class="mt-2">${productos.nombre}</h4>
        <h5 class="m-4"><b>$${productos.precio}</b></h5>
        <span class="restar"><b> - </b></span>
        <p class="cantidad"><b>Cantidad:${productos.cantidad}</b></p>
        <span class="sumar"><b> + </b></span>
        <p class="total"><b> Total:${productos.cantidad * productos.precio}</b></p>
        <span class="delete-product"> ❌ </span>
       `;

       modalContainer.append(carritoContent)

       let restar = carritoContent.querySelector(".restar")

       restar.addEventListener("click", () => {
        if(productos.cantidad !== 1) {
        productos.cantidad--;
        }
        saveLocal();
        pintarCarrito();
       });

       let sumar = carritoContent.querySelector(".sumar");
       sumar.addEventListener("click", () => {
        productos.cantidad++;
        saveLocal();
        pintarCarrito();
       })

       let eliminar = carritoContent.querySelector(".delete-product");

       eliminar.addEventListener("click", ()=> {
        eliminarProducto(productos.id);
       })
       
    });
    

    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
 
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `<b>total a pagar: ${total} $</b>`;
    modalContainer.append(totalBuying); 

};

verCarrito.addEventListener("click", pintarCarrito);


const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);
    
    

    Swal.fire({
        title: 'Esta seguro que desea quitar el producto del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
            carrito = carrito.filter((carritoId) => {
                return carritoId !== foundId;
            });
            carritoCounter();
            saveLocal();
            pintarCarrito();
          Swal.fire(
            'Deleted!',
            'Quitado del carrito correctamente.',
            'success'
          )
        }
      })
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
carritoCounter();

