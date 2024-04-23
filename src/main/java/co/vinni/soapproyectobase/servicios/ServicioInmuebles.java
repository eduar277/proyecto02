package co.vinni.soapproyectobase.servicios;

import co.vinni.soapproyectobase.dto.InmuebleDto;
import co.vinni.soapproyectobase.entidades.Inmueble;
import co.vinni.soapproyectobase.repositorios.RepositorioInmueble;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.List;

@Service
public class ServicioInmuebles implements Serializable {

    private final ModelMapper modelMapper;

    @Autowired
    private RepositorioInmueble repositorioInmueble;

    @Autowired
    public ServicioInmuebles(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public InmuebleDto registrarInmueble(InmuebleDto inmuebleDto) {
        Inmueble inmueble = repositorioInmueble.save(modelMapper.map(inmuebleDto, Inmueble.class));
        return modelMapper.map(inmueble, InmuebleDto.class);
    }

    public List<InmuebleDto> listarInmuebles() {
        TypeToken<List<InmuebleDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(repositorioInmueble.findAll(), typeToken.getType());
    }
}
