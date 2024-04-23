export class Inmueble {
  titulo: string;
  direccion: string;
  numHabitaciones: number;
  numBanios: number;
  precioPorDia: number;
  descripcion: string;
  id: number;

  constructor(titulo: string, descripcion: string, direccion: string, numHabitaciones: number, numBanios: number, precioPorDia: number, id:number) {
    this.titulo = titulo;
    this.direccion = direccion;
    this.numHabitaciones = numHabitaciones;
    this.numBanios = numBanios;
    this.precioPorDia = precioPorDia;
    this.descripcion = descripcion;
    this.id = id;
  }
}
