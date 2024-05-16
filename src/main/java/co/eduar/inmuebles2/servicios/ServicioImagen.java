package co.eduar.inmuebles2.servicios;

import co.eduar.inmuebles2.entidades.Imagen;
import co.eduar.inmuebles2.entidades.Inmueble;
import co.eduar.inmuebles2.repositorios.RepositorioImagen;
import co.eduar.inmuebles2.repositorios.RepositorioInmueble;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServicioImagen {

    private final RepositorioImagen repositorioImagen;
    private final RepositorioInmueble repositorioInmueble;

    @Autowired
    public ServicioImagen(RepositorioImagen repositorioImagen, RepositorioInmueble repositorioInmueble) {
        this.repositorioImagen = repositorioImagen;
        this.repositorioInmueble = repositorioInmueble;
    }

    public Imagen guardarImagen(MultipartFile archivo, Long inmuebleId) throws IOException {
        String nombreArchivo = archivo.getOriginalFilename();
        String tipo = archivo.getContentType();
        byte[] datos = archivo.getBytes();

        Optional<Inmueble> inmuebleOptional = repositorioInmueble.findById(inmuebleId);
        if (!inmuebleOptional.isPresent()) {
            throw new IllegalStateException("Inmueble no encontrado");
        }
        Inmueble inmueble = inmuebleOptional.get();

        Imagen imagen = new Imagen(nombreArchivo, tipo, datos, inmueble);
        return repositorioImagen.save(imagen);
    }

    public List<Imagen> obtenerImagenesPorInmueble(Long inmuebleId) {
        return repositorioImagen.findAll().stream()
                .filter(imagen -> imagen.getInmueble().getId() == inmuebleId)
                .collect(Collectors.toList());
    }

}



