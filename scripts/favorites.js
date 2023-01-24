import getDataFetch from "../helpers/getData.js";
import { printCardsInmuebles } from "../modules/printInmueble.js";

const urlFavoritos = "http://localhost:3000/favoritos";
const contenedor = document.getElementById("contenedorInmuebles");


document.addEventListener('DOMContentLoaded', async() => {
    const favoritos = await getDataFetch(urlFavoritos);
    printCardsInmuebles(contenedor, favoritos);
})