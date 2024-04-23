package co.vinni.soapproyectobase.controladores;

import co.vinni.soapproyectobase.dto.InmuebleDto;
import co.vinni.soapproyectobase.servicios.ServicioInmuebles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControladorInmuebles {

    @Autowired
    private ServicioInmuebles servicioInmuebles;

    @PostMapping("/api/inmuebles/registrar")
    public ResponseEntity<InmuebleDto> registrarInmueble(@RequestBody InmuebleDto inmuebleDto) {
        InmuebleDto inmuebleRegistrado = servicioInmuebles.registrarInmueble(inmuebleDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(inmuebleRegistrado);
    }

    // Otros métodos del controlador aquí, como listarInmuebles()

}



