
import getDataFetch from "../helpers/getData.js";
import deleteDataFetch from "../helpers/deleteData.js"
import { btnFilterType, btnFilterUbicacion } from "../modules/btnCategoryFilters.js";
import { printCardsInmuebles } from "../modules/printInmueble.js";
import postDataFetch from "../helpers/postData.js"

const urlInmuebles = 'http://localhost:3000/inmuebles';
const urlFavoritos = 'http://localhost:3000/favoritos';
let inmuebles = [];

const containerInmuebles = document.getElementById('contenedorInmuebles')

// Botones de filtrado

// Conjunto de botones
const btnType = document.getElementById('allType')
const btnHouse = document.getElementById('house')
const btnApartament = document.getElementById('apartament')

const filterType = [btnType, btnHouse, btnApartament];

// Conjunto 2 de botones 

const btnUbicacion = document.getElementById('allStatus')
const btnFlorida = document.getElementById('florida')
const btnNewJersey = document.getElementById('newjersey')
const btnCalifornia = document.getElementById('california')

const filterUbicacion = [btnUbicacion, btnFlorida, btnNewJersey, btnCalifornia];

// Funcionalidad 

document.addEventListener('DOMContentLoaded', async () => {
    try {
        inmuebles = await getDataFetch(urlInmuebles)

        printCardsInmuebles(containerInmuebles, inmuebles);
        btnFilterType(filterType, inmuebles, containerInmuebles);
        btnFilterUbicacion(filterUbicacion, inmuebles, containerInmuebles)

    } catch (error) {
        console.log(error);
        alert(error);
    }
});


// Abrir nuevo video con detalles

document.addEventListener('click', async ({ target }) => {
    sessionStorage.removeItem('editInmueble')
    sessionStorage.removeItem('crearInmueble')

    if (target.classList.contains('img-card')) {
        window.location.href = './pages/seeDetails.html'
        sessionStorage.setItem('seeDetails', JSON.stringify(target.id))
    }

    // Eliminar un inmueble
    if (target.classList.contains('main-remove')) {
        //const confirmDelete = confirm('¿Está usted segurod e eliminar este inmueble?');
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                const idInmuebleDelete = parseInt(target.name);
                const urlDelete = `${urlInmuebles}/${idInmuebleDelete}`

                try {
                    await deleteDataFetch(urlDelete);
                    inmuebles = await getDataFetch(urlInmuebles);
                    printCardsInmuebles(containerInmuebles, inmuebles);
                } catch (error) {
                    console.log('No se pudo eliminar hay un error' + error);

                }
            }
        });
    }

    // Crear personaje
    if (target.classList.contains("enlace-mainfavorito")) {
        sessionStorage.setItem("crearInmueble", JSON.stringify(target.name));
        window.location.href = "./pages/newInmueble.html";
    }

    // Inicio de edición
    if (target.classList.contains("main-edit")) {
        sessionStorage.setItem("editInmueble", JSON.stringify(target.name));
        window.location.href = "./pages/newInmueble.html";
    }

    //Para agregar a favoritos
    if (target.classList.contains("main-favorite")) {
        const idFavorito = target.name;
        const urlInmuebleFavorito = `${urlFavoritos}?id=${idFavorito}`;
        const favorito = await getDataFetch(urlInmuebleFavorito);
        //Obtenemos el objeto
        const favoriteInmueble = await getDataFetch(
            `${urlInmuebles}/${idFavorito}`
        );
        if (favorito.length === 0 && Object.entries(favoriteInmueble).length) {
            await postDataFetch(urlFavoritos, favoriteInmueble);
            const data = await getDataFetch(urlFavoritos);
            console.log(data);
        }
    }
})

/*Escuchar el evento search del input de búsqueda por nombre
search.addEventListener("search", async () => {
    const searchTerm = search.value;
    try {
        if (searchTerm) {
            const datosPersonajes = await getDataFetch(urlPersonajes);
            const resultadoBusqueda = datosPersonajes.filter((person) =>
                person.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            printCardsPersonajes(contenedorPersonajes, resultadoBusqueda);
        } else {
            const datosPersonajes = await getDataFetch(urlPersonajes);
            printCardsPersonajes(contenedorPersonajes, datosPersonajes);
        }
    } catch (error) {
        console.log(error);
    }
});*/


