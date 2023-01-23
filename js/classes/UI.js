import { cargarEdicion, eliminarCita } from "../functions.js";
import { appointmentsContainer } from "../selectors.js";

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
      .insertBefore(alertMessage, document.querySelector("#contenido").firstChild);

    // eliminar la alerta a los dos segundos
    setTimeout(() => {
      alertMessage.remove();
    }, 2000);
  }

  printAppointments(citas) {
    // primero borrar lo que ya este alli
    this.cleanAppointmentsHTML();

    //2- Imprimo todo el array

    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

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
      btnEdit.onclick = () => cargarEdicion(cita);

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

export default UI;
