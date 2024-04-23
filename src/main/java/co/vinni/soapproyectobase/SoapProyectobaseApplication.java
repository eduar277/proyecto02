package co.vinni.soapproyectobase;

import co.vinni.soapproyectobase.entidades.Inmueble;
import co.vinni.soapproyectobase.repositorios.RepositorioInmueble;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper; // Importar ModelMapper
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean; // Importar Bean
import org.springframework.context.annotation.ComponentScan;

import java.util.List;

@SpringBootApplication
@ComponentScan(basePackages = {"co.vinni.soapproyectobase.servicios"})
@Log4j2
public class SoapProyectobaseApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(SoapProyectobaseApplication.class, args);
        System.out.println("Proyecto base");
    }

    @Autowired
    RepositorioInmueble repositorioInmueble;

    // Configuración manual de ModelMapper como Bean
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Override
    public void run(String... args) throws Exception {
        Inmueble nuevoInmueble = new Inmueble();
        nuevoInmueble.setTitulo("Casa en la playa");
        nuevoInmueble.setDescripcion("Hermosa casa con vista al mar");
        nuevoInmueble.setDireccion("Calle Principal, Ciudad de la Playa");
        nuevoInmueble.setNumHabitaciones(3);
        nuevoInmueble.setNumBanios(2);
        nuevoInmueble.setPrecioPorDia(150.00);

        repositorioInmueble.save(nuevoInmueble);

        List<Inmueble> listaInmuebles = repositorioInmueble.findAll();
        for (Inmueble inmueble : listaInmuebles) {
            System.out.println(inmueble);
        }
    }
}

