import getDataFetch from "../helpers/getData.js";

// Obtener la informacion del personaje 

const idInmuebleStr = sessionStorage.getItem('seeDetails') ? JSON.parse(sessionStorage.getItem('seeDetails')) : null;

const idInmueble = idInmuebleStr ? parseInt(idInmuebleStr) : null;

//Obtener la informacion de este inmueble realizacion una peticion GET

const urlInmueble = `http://localhost:3000/inmuebles/${idInmueble}`
const title = document.querySelector(".title");
const contenedor = document.querySelector(".main");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const inmueble = await getDataFetch(urlInmueble);

        title.innerText = `Detalles del inmueble de ${inmueble.propietario}`;
        //2. Insertar la información
        contenedor.innerHTML = `
        <figure class="main-figure">
        <img src="${"." + inmueble.imagen}" alt="">
    </figure>
        <ol>
            <li class="main-name">${inmueble.name}</li>
            <li class="main-precio">${inmueble.precio}</li>
            <li class="main-ubicacion">${inmueble.status}</li>
            <li class="main-propietario">${inmueble.propietario}</li>
            <li class="main-descripcion">${inmueble.descripcion}</li>
        </ol>
    `;
    } catch (error) {
        console.log(error);
        alert(error);
    }
});