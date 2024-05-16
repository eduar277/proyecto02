package co.eduar.inmuebles2.controladores;

import co.eduar.inmuebles2.dto.InmuebleDto;
import co.eduar.inmuebles2.servicios.ServicioInmuebles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/inmuebles")
@CrossOrigin(origins = "*")
public class ControladorInmuebles {

    private final ServicioInmuebles servicioInmuebles;

    @Autowired
    public ControladorInmuebles(ServicioInmuebles servicioInmuebles) {
        this.servicioInmuebles = servicioInmuebles;
    }

    @GetMapping("/all")
    public ResponseEntity<List<InmuebleDto>> listarInmuebles() {
        List<InmuebleDto> inmuebles = servicioInmuebles.obtenerInmuebles();
        if (inmuebles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(inmuebles);
    }

    @PostMapping("/registro")
    public ResponseEntity<InmuebleDto> registrarInmueble(
            @RequestParam("titulo") String titulo,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("direccion") String direccion,
            @RequestParam("numHabitaciones") int numHabitaciones,
            @RequestParam("numBanios") int numBanios,
            @RequestParam("precioPorDia") double precioPorDia,
            @RequestParam("imagenes") MultipartFile[] imagenes) {

        List<String> rutasImagenes = new ArrayList<>();
        Path directorioImagenes = Paths.get("uploads");

        if (!Files.exists(directorioImagenes)) {
            try {
                Files.createDirectories(directorioImagenes);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.internalServerError().build();
            }
        }

        for (MultipartFile imagen : imagenes) {
            if (!imagen.isEmpty()) {
                try {
                    String nombreImagen = System.currentTimeMillis() + "-" + imagen.getOriginalFilename();
                    Path rutaImagen = directorioImagenes.resolve(nombreImagen);
                    Files.copy(imagen.getInputStream(), rutaImagen, StandardCopyOption.REPLACE_EXISTING);
                    rutasImagenes.add(rutaImagen.toString());
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.internalServerError().build();
                }
            }
        }

        InmuebleDto inmuebleDto = new InmuebleDto();
        inmuebleDto.setTitulo(titulo);
        inmuebleDto.setDescripcion(descripcion);
        inmuebleDto.setDireccion(direccion);
        inmuebleDto.setNumHabitaciones(numHabitaciones);
        inmuebleDto.setNumBanios(numBanios);
        inmuebleDto.setPrecioPorDia(precioPorDia);
        inmuebleDto.setImagenesRutas(rutasImagenes);

        InmuebleDto inmuebleRegistrado = servicioInmuebles.registrarInmueble(inmuebleDto);
        if (inmuebleRegistrado == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(inmuebleRegistrado);
    }
}
