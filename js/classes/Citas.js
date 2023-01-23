class Citas {
  constructor() {
    this.citas = [];
  }

  addAppointment(cita) {
    this.citas = [...this.citas, cita];
    this.syncStorage(this.citas);
  }

  deleteAppointment(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
    localStorage.setItem("appointments", JSON.stringify(this.citas));
  }

  editApppointment(citaUpdated) {
    this.citas = this.citas.map((cita) => (cita.id === citaUpdated.id ? citaUpdated : cita));
    localStorage.setItem("appointments", JSON.stringify(this.citas));
  }

  syncStorage() {
    localStorage.setItem("appointments", JSON.stringify(this.citas));
  }
}

export default Citas;
