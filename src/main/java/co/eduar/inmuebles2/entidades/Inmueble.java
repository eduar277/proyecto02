package co.eduar.inmuebles2.entidades;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Inmueble")
@Table(name = "INMUEBLES")
public class Inmueble implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_INMUEBLES")
    @SequenceGenerator(name = "SEQ_INMUEBLES", sequenceName = "SEQ_INMUEBLES", allocationSize = 1)
    @Column(name = "ID", nullable = false)
    private long id;

    @Column(name = "TITULO", nullable = false)
    private String titulo;

    @Column(name = "DESCRIPCION", nullable = false)
    private String descripcion;

    @Column(name = "DIRECCION", nullable = false)
    private String direccion;

    @Column(name = "NUM_HABITACIONES", nullable = false)
    private int numHabitaciones;

    @Column(name = "NUM_BANIOS", nullable = false)
    private int numBanios;

    @Column(name = "PRECIO_POR_DIA", nullable = false)
    private double precioPorDia;
}
