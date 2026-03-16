function showTab(id, element){

    document.querySelectorAll(".section").forEach(sec=>{
        sec.classList.remove("active");
    });

    document.querySelectorAll(".tab").forEach(tab=>{
        tab.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
    element.classList.add("active");
}

const grid = document.getElementById("portfolioGrid");

if(grid){
    const totalImagenes = 6;

    for(let i = 1; i <= totalImagenes; i++){
        const img = document.createElement("img");
        img.src = `img/imagen${i}.jpg`;
        grid.appendChild(img);
    }
}


function addToCart(nombre, precio, btn){

    const qtyInput = btn.previousElementSibling;
    const cantidad = parseInt(qtyInput.value);

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito 🛒");
}



const cartContainer = document.getElementById("cartItems");

if(cartContainer){

    renderCart();
}

function renderCart(){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cartContainer.innerHTML = "";

    let total = 0;

    if(carrito.length === 0){
        cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
        document.getElementById("total").innerText = "";
        return;
    }

    carrito.forEach((item, index) => {

        const div = document.createElement("div");
        div.classList.add("cart-item");

        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        div.innerHTML = `
            <strong>${item.nombre}</strong><br>
            Cantidad: ${item.cantidad}<br>
            Subtotal: $${subtotal} MXN<br>
            <button onclick="removeItem(${index})" class="danger-btn">Eliminar</button>
        `;

        cartContainer.appendChild(div);
    });

    document.getElementById("total").innerText = "Total: $" + total + " MXN";

    
    const actions = document.createElement("div");
    actions.innerHTML = `
        <br>
        <button onclick="clearCart()" class="danger-btn">Vaciar carrito</button>
        <button onclick="makeOrder()" class="btn">Hacer pedido</button>
    `;
    cartContainer.appendChild(actions);
}

function removeItem(index){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    renderCart();
}

function clearCart(){

    localStorage.removeItem("carrito");

    renderCart();
}

function makeOrder(){

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if(carrito.length === 0){
        alert("Tu carrito está vacío.");
        return;
    }

    alert("🎉 Pedido realizado con éxito.\nNos pondremos en contacto contigo pronto.");

    localStorage.removeItem("carrito");

    renderCart();
}