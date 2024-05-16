package co.eduar.inmuebles2.entidades;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity(name = "Inmueble")
@Table(name = "INMUEBLES")
public class Inmueble implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_INMUEBLES")
    @SequenceGenerator(name = "SEQ_INMUEBLES", sequenceName = "SEQ_INMUEBLES", allocationSize = 1)
    @Column(name = "ID", nullable = false)
    @EqualsAndHashCode.Include
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

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "INMUEBLE_IMAGENES", joinColumns = @JoinColumn(name = "INMUEBLE_ID"))
    @Column(name = "RUTA_IMAGEN")
    private List<String> imagenesRutas;
}
