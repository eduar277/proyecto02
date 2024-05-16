package co.eduar.inmuebles2.repositorios;
import co.eduar.inmuebles2.entidades.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RepositorioImagen extends JpaRepository<Imagen, Long> {
}

