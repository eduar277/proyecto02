export class Inmueble {
  id?: number;
  titulo: string = '';
  descripcion: string = '';
  direccion: string = '';
  numHabitaciones: number = 0;
  numBanios: number = 0;
  precioPorDia: number = 0;
  imagenesRutas?: string[] = [];
  expanded?: boolean = false; // Añade la propiedad 'expanded'
}


