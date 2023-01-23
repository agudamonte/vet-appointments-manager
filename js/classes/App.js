import { datosCita, newAppointment, printLocalStorage } from "../functions.js";
import {
  petNameInput,
  petOwnerInput,
  telephoneInput,
  dateInput,
  hourInput,
  symptomsInput,
  appointmentForm,
  appointmentsContainer,
} from "../selectors.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    document.addEventListener("DOMContentLoaded", printLocalStorage);
    petNameInput.addEventListener("change", datosCita);
    petOwnerInput.addEventListener("change", datosCita);
    telephoneInput.addEventListener("change", datosCita);
    dateInput.addEventListener("change", datosCita);
    hourInput.addEventListener("change", datosCita);
    symptomsInput.addEventListener("change", datosCita);

    // Form new appoiintments
    appointmentForm.addEventListener("submit", newAppointment);
  }
}

export default App;
