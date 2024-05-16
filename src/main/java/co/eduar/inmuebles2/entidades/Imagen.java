package co.eduar.inmuebles2.entidades;
import jakarta.persistence.*;
import java.util.Objects;
import java.util.Arrays;

@Entity
@Table(name = "imagenes")
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_archivo", nullable = false)
    private String nombreArchivo;

    @Column(name = "tipo", nullable = false)
    private String tipo;

    @Lob
    @Column(name = "datos", nullable = false)
    private byte[] datos;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inmueble_id", nullable = false)
    private Inmueble inmueble;

    public Imagen() {
    }

    public Imagen(String nombreArchivo, String tipo, byte[] datos, Inmueble inmueble) {
        this.nombreArchivo = nombreArchivo;
        this.tipo = tipo;
        this.datos = datos;
        this.inmueble = inmueble;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public byte[] getDatos() {
        return datos;
    }

    public void setDatos(byte[] datos) {
        this.datos = datos;
    }

    public Inmueble getInmueble() {
        return inmueble;
    }

    public void setInmueble(Inmueble inmueble) {
        this.inmueble = inmueble;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Imagen)) return false;
        Imagen imagen = (Imagen) o;
        return Objects.equals(id, imagen.id) &&
                Objects.equals(nombreArchivo, imagen.nombreArchivo) &&
                Objects.equals(tipo, imagen.tipo) &&
                Arrays.equals(datos, imagen.datos) &&
                Objects.equals(inmueble, imagen.inmueble);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, nombreArchivo, tipo, inmueble);
        result = 31 * result + Arrays.hashCode(datos);
        return result;
    }

    @Override
    public String toString() {
        return "Imagen{" +
                "id=" + id +
                ", nombreArchivo='" + nombreArchivo + '\'' +
                ", tipo='" + tipo + '\'' +
                ", datos=" + Arrays.toString(datos) +
                ", inmueble=" + inmueble +
                '}';
    }
}



