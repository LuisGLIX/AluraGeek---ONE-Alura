document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.formproducto__form');
    const productosContainer = document.getElementById('productos');

    // Fetch existing products from the JSON server and display them
    fetch('http://localhost:3000/productos')
        .then(response => response.json())
        .then(productos => {
            productos.forEach(producto => {
                addProductCard(producto);
            });
        });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombre = form.nombre.value;
        const precio = form.precio.value;
        const imagen = form.imagen.value;

        if (nombre && precio && imagen) {
            const producto = { nombre, precio, imagen };
            
            fetch('http://localhost:3000/productos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
            .then(response => response.json())
            .then(data => {
                addProductCard(data);
                form.reset();
            });
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    function addProductCard(producto) {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('card-container--info');

        const nombreP = document.createElement('p');
        nombreP.textContent = producto.nombre;

        const valueContainer = document.createElement('div');
        valueContainer.classList.add('card-container--value');

        const precioP = document.createElement('p');
        precioP.textContent = `$ ${producto.precio}`;

        const trashIcon = document.createElement('img');
        trashIcon.src = './assets/vector.png';
        trashIcon.alt = 'Eliminar producto';
        trashIcon.addEventListener('click', () => {
            fetch(`http://localhost:3000/productos/${producto.id}`, {
                method: 'DELETE'
            }).then(() => {
                productosContainer.removeChild(card);
            });
        });

        valueContainer.appendChild(precioP);
        valueContainer.appendChild(trashIcon);

        infoContainer.appendChild(nombreP);
        infoContainer.appendChild(valueContainer);

        card.appendChild(img);
        card.appendChild(infoContainer);

        productosContainer.appendChild(card);
    }
});
function limpiarFormulario() {
    const form = document.querySelector('.formproducto__form');
    form.reset();
}
