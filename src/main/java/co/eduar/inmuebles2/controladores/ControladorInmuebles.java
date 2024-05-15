package co.eduar.inmuebles2.controladores;

import co.eduar.inmuebles2.dto.InmuebleDto;
import co.eduar.inmuebles2.servicios.ServicioInmuebles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inmuebles")
@CrossOrigin(origins = "*") // Permite solicitudes CORS desde cualquier origen
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
    public ResponseEntity<InmuebleDto> registrarInmueble(@RequestBody InmuebleDto inmuebleDto) {
        InmuebleDto inmuebleRegistrado = servicioInmuebles.registrarInmueble(inmuebleDto);
        if (inmuebleRegistrado == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(inmuebleRegistrado);
    }
}