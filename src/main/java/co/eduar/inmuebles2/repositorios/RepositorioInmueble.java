package co.vinni.soapproyectobase.repositorios;

import co.vinni.soapproyectobase.entidades.Inmueble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RepositorioInmueble extends JpaRepository<Inmueble, Long>, JpaSpecificationExecutor<Inmueble> {

}
