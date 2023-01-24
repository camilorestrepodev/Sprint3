import getDataFetch from "../helpers/getData.js";
import { submitForm } from "../modules/submitForm.js";


const urlInmueble = 'http://localhost:3000/inmuebles';

const form = document.querySelector('.form');

const valuesForm = Object.values(form);
console.log(valuesForm);

const editFormStr = sessionStorage.getItem('editInmueble')
    ? JSON.parse(sessionStorage.getItem('editInmueble')) :
    '';

const editForm = editFormStr ? parseInt(editFormStr) : null;

// Para actualizar el titulo de acuerdo a la accion

const title = document.querySelector(".title")
const submitButton = valuesForm[valuesForm.length - 1]
console.log(submitButton);

submitButton.innerHTML = editForm ? 'Guardar cambios' : 'Crear Inmueble';

document.addEventListener('DOMContentLoaded', async () => {

    let editInmueble = {};
    const url = editForm ? `${urlInmueble}/${editForm}` : urlInmueble;

    if (editForm) {
        try {
            const urlEdit = `${urlInmueble}/${editForm}`;
            editInmueble = await getDataFetch(urlEdit)

            title.innerText = editForm
                ? `Actuliza los de ${editInmueble.propietario}`
                : 'Agregar nuevo personaje';

            valuesForm.forEach((valueInput) => {
                if (valueInput.id) {
                    valueInput.value = editInmueble[valueInput.id];
                }
            });

            await submitForm(form, url, editForm);

        } catch (error) {
            console.log(error);
            alert(error);
        }
    }
})