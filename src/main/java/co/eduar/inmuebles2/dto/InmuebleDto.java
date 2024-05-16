package co.eduar.inmuebles2.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class InmuebleDto implements Serializable {
    private long id;
    private String titulo;
    private String descripcion;
    private String direccion;
    private int numHabitaciones;
    private int numBanios;
    private double precioPorDia;
    private List<String> imagenesRutas;
}
