import { printCardsInmuebles } from "./printInmueble.js";

export const btnFilterType = (arrayBtns, arrayInmueble, contenedor) => {
    arrayBtns.forEach(option =>{
        option.addEventListener('click', ()=>{
            const filtro = arrayInmueble.filter(
                (inmueble) => inmueble.tipo === option.id);
            const arrayFiltered = option.id === "allType" ? arrayInmueble : filtro;
            printCardsInmuebles(contenedor, arrayFiltered)
            console.log(arrayFiltered);
        })
    })
}


export const btnFilterUbicacion = (arrayBtns, arrayInmueble, contenedor) => {
    arrayBtns.forEach(option =>{
        option.addEventListener('click', (event)=>{
            const filterUbicacion = arrayInmueble.filter(
                (inmueble) => inmueble.ubicacion === option.id);
            const ubicacionesFiltradas = option.id === "allStatus" ? arrayInmueble : filterUbicacion;
            printCardsInmuebles(contenedor, filterUbicacion)
            console.log(ubicacionesFiltradas);
        })
    })
}