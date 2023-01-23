import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";

import {
  petNameInput,
  petOwnerInput,
  telephoneInput,
  dateInput,
  hourInput,
  symptomsInput,
  appointmentForm,
  appointmentsContainer,
} from "./selectors.js";

const administrarCitas = new Citas();
const ui = new UI();

let editando;

// Objeto con la informacion de la cita
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

export function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

export function newAppointment(e) {
  e.preventDefault();

  // extraer la info del objeto de citas
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  if ((mascota === "", propietario === "", telefono === "", fecha === "", hora === "", sintomas === "")) {
    ui.printAlert(`todos los campos son obligatorios`, "error");
    return;
  }

  if (editando) {
    //Pasar el objeto del array a edicion
    administrarCitas.editApppointment({ ...citaObj });

    // Vuelvo el texto del boton submit a su valor original
    appointmentForm.querySelector('button[type="submit"]').textContent = `Crear Cita`;

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
    syncStorage();
  }

  // Reset the object that saves the appointment details
  resetObject();

  // print HTML
  ui.printAppointments(administrarCitas.citas);

  // reset the form
  appointmentForm.reset();
}

function resetObject() {
  for (const prop in citaObj) {
    citaObj[prop] = "";
  }
}

export function eliminarCita(id) {
  // Elimina la cita del array en el Objeto
  administrarCitas.deleteAppointment(id);
  // Limpia la cita desde el HTML
  ui.printAppointments(administrarCitas.citas);
  //Muestra el mensaje de eliminado correctamente
  ui.printAlert(`Eliminado correctamente`, "success");
}

// Carga los datos y el modo edicion
export function cargarEdicion(cita) {
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
  appointmentForm.querySelector('button[type="submit"]').textContent = `Guardar Cambios`;

  editando = true;
}

export function syncStorage(appointments) {
  administrarCitas.syncStorage(appointments);
}
// Para incorporar local storage
let appointments = [];

export function printLocalStorage() {
  appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  ui.printAppointments(appointments);
  administrarCitas.citas = appointments;
}
