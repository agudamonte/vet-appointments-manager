// Inputs
const petNameInput = document.querySelector("#mascota");
const petOwnerInput = document.querySelector("#propietario");
const telephoneInput = document.querySelector("#telefono");
const dateInput = document.querySelector("#fecha");
const hourInput = document.querySelector("#hora");
const symptomsInput = document.querySelector("#sintomas");

//Formulario
const appointmentForm = document.querySelector("#nueva-cita");
// Listado de citas creadas
const appointmentsContainer = document.querySelector("#citas");

// modo edicion
let editando;

class Citas {
    constructor() {
        this.citas = [];
    }

    addAppointment(cita) {
        this.citas = [...this.citas, cita];
    }

    deleteAppointment(id) {
        this.citas = this.citas.filter((cita) => cita.id !== id);
    }

    editApppointment(citaUpdated) {
        this.citas = this.citas.map((cita) =>
            cita.id === citaUpdated.id ? citaUpdated : cita
        );
    }
}

class UI {
    printAlert(message, type) {
        // Prevent simultaneous multiples alerts
        if (document.querySelector("#alert-message")) {
            document.querySelector("#alert-message").remove();
        }

        const alertMessage = document.createElement("div");
        alertMessage.textContent = message;
        alertMessage.id = "alert-message";
        alertMessage.classList.add(
            "alert",
            "text-center",
            "d-block",
            "col-12",
            "font-weight-bold",
            "text-uppercase"
        );

        if (type === "error") {
            alertMessage.classList.add("alert-danger");
        } else {
            alertMessage.classList.add("alert-success");
        }

        document
            .querySelector("#contenido")
            .insertBefore(
                alertMessage,
                document.querySelector("#contenido").firstChild
            );

        // eliminar la alerta a los dos segundos
        setTimeout(() => {
            alertMessage.remove();
        }, 2000);
    }

    printAppointments({ citas }) {
        // primero borrar lo que ya este alli
        this.cleanAppointmentsHTML();

        //2- Imprimo todo el array

        citas.forEach((cita) => {
            const {
                mascota,
                propietario,
                telefono,
                fecha,
                hora,
                sintomas,
                id,
            } = cita;

            const divCita = document.createElement("div");
            divCita.classList.add("cita", "p-3");
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement("h2");
            mascotaParrafo.classList.add("card-title", "font-weight-bolder");
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement("p");
            propietarioParrafo.innerHTML = `
            <span class='font-weight-bolder'> Propietario: </span> ${propietario}
            `;
            const telefonoParrafo = document.createElement("p");
            telefonoParrafo.innerHTML = `
            <span class='font-weight-bolder'> Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement("p");
            fechaParrafo.innerHTML = `
            <span class='font-weight-bolder'> Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement("p");
            horaParrafo.innerHTML = `
            <span class='font-weight-bolder'> Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement("p");
            sintomasParrafo.innerHTML = `
            <span class='font-weight-bolder'> Sintomas: </span> ${sintomas}
            `;

            // Btn para eliminar las citas
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = `
            Elminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            `;
            deleteBtn.classList.add("btn", "btn-danger", "mr-2");
            deleteBtn.onclick = () => {
                eliminarCita(id);
            };

            // Btn EDIT
            const btnEdit = document.createElement("button");
            btnEdit.classList.add("btn", "btn-info");
            btnEdit.innerHTML = `
            Editar <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
            `;
            btnEdit.onclick = () => {
                cargarEdicion(cita);
            };

            //Agregar los parrafos al divCita.
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(deleteBtn);
            divCita.appendChild(btnEdit);

            // Agregar al HTML
            appointmentsContainer.appendChild(divCita);
        });
    }

    cleanAppointmentsHTML() {
        while (appointmentsContainer.firstChild) {
            appointmentsContainer.removeChild(appointmentsContainer.firstChild);
        }
    }
}

const administrarCitas = new Citas();
const ui = new UI();

eventListeners();
function eventListeners() {
    petNameInput.addEventListener("change", datosCita);
    petOwnerInput.addEventListener("change", datosCita);
    telephoneInput.addEventListener("change", datosCita);
    dateInput.addEventListener("change", datosCita);
    hourInput.addEventListener("change", datosCita);
    symptomsInput.addEventListener("change", datosCita);

    appointmentForm.addEventListener("submit", newAppointment);
}

// Objeto con la informacion de la cita
const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
};

// Functions
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

function newAppointment(e) {
    e.preventDefault();

    // extraer la info del objeto de citas
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if (
        (mascota === "",
        propietario === "",
        telefono === "",
        fecha === "",
        hora === "",
        sintomas === "")
    ) {
        ui.printAlert(`todos los campos son obligatorios`, "error");
        return;
    }

    if (editando) {
        //Pasar el objeto del array a edicion
        administrarCitas.editApppointment({ ...citaObj });

        // Vuelvo el texto del boton submit a su valor original
        appointmentForm.querySelector(
            'button[type="submit"]'
        ).textContent = `Crear Cita`;

        // Alerta cambios guardados
        ui.printAlert(`Editado correctamente`, "success");

        // Quitar modo edicion
        editando = false;
    } else {
        // Generar un ID
        citaObj.id = Date.now();
        // si pasa la validacion, mando la cita al la instancia de Clases
        administrarCitas.addAppointment({ ...citaObj });
        // imprimir alerta correcta
        ui.printAlert(`Cita creada correctamente`, "success");
    }

    // Reset the object that saves the appointment details
    resetObject();

    // print HTML
    ui.printAppointments(administrarCitas);

    // reset the form
    appointmentForm.reset();
}

function resetObject() {
    for (const prop in citaObj) {
        citaObj[prop] = "";
    }
}

function eliminarCita(id) {
    // Elimina la cita del array en el Objeto
    administrarCitas.deleteAppointment(id);
    // Limpia la cita desde el HTML
    ui.printAppointments(administrarCitas);
    //Muestra el mensaje de eliminado correctamente
    ui.printAlert(`Eliminado correctamente`, "success");
}

// Carga los datos y el modo edicion
function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llena los inputs con los valores cargados previamente
    petNameInput.value = mascota;
    petOwnerInput.value = propietario;
    telephoneInput.value = telefono;
    dateInput.value = fecha;
    hourInput.value = hora;
    symptomsInput.value = sintomas;

    // Lleno el objeto citaObj
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Actualizo el texto del boton
    appointmentForm.querySelector(
        'button[type="submit"]'
    ).textContent = `Guardar Cambios`;

    editando = true;
}
