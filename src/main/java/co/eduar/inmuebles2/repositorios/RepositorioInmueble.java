package co.eduar.inmuebles2.repositorios;

import co.eduar.inmuebles2.entidades.Inmueble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RepositorioInmueble extends JpaRepository<Inmueble, Long>, JpaSpecificationExecutor<Inmueble> {

}
