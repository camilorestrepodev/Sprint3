export const printCardsInmuebles = (contenedor, arrayInmuebles)=>{
    contenedor.innerHTML = "";
    arrayInmuebles.forEach(inmueble =>{
        const article = document.createElement("article");
        article.classList.add("main-card");
        article.innerHTML = `
        <figure class="figure-image">
                    <img id=${inmueble.id} src=${inmueble.imagen} alt=${inmueble.name} class="img-card">
                    <button class="main-favorite" name=${inmueble.id}>❤</button>
                </figure>
                <button class="main-remove" name=${inmueble.id}>❌</button>
                <button class="main-edit" name=${inmueble.id}>📝</button>
                <button class="main-favorite" name=${inmueble.id}>❤</button>
                <h2 class="main-precio">${inmueble.precio}</h2>
                <h2 class="main-ubicacion">${inmueble.status}</h2>
                <h2 class="main-nombre">${inmueble.name}</h2>
                <h2 class="main-propietario">${inmueble.propietario}</h2>
        `
        contenedor.appendChild(article)
    })
}