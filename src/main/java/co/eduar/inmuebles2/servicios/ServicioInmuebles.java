package co.eduar.inmuebles2.servicios;
import co.eduar.inmuebles2.dto.InmuebleDto;
import co.eduar.inmuebles2.entidades.Inmueble;
import co.eduar.inmuebles2.repositorios.RepositorioInmueble;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioInmuebles {

    private final RepositorioInmueble repositorioInmueble;
    private final ModelMapper modelMapper;

    @Autowired
    public ServicioInmuebles(RepositorioInmueble repositorioInmueble, ModelMapper modelMapper) {
        this.repositorioInmueble = repositorioInmueble;
        this.modelMapper = modelMapper;
    }

    public InmuebleDto registrarInmueble(InmuebleDto inmuebleDto) {
        Inmueble inmueble = modelMapper.map(inmuebleDto, Inmueble.class);
        Inmueble inmuebleGuardado = repositorioInmueble.save(inmueble);
        return modelMapper.map(inmuebleGuardado, InmuebleDto.class);
    }

    public List<InmuebleDto> obtenerInmuebles() {
        List<Inmueble> inmuebles = repositorioInmueble.findAll();
        return inmuebles.stream()
                .map(inmueble -> modelMapper.map(inmueble, InmuebleDto.class))
                .collect(Collectors.toList());
    }
}
