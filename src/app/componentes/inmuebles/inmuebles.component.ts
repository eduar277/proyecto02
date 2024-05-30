import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InmueblesService } from '../../servicios/inmuebles.service';
import { Inmueble } from '../../vo/inmueble';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
  @ViewChild('previewModal') previewModal!: TemplateRef<any>;
  @ViewChild('detalleModal') detalleModal!: TemplateRef<any>;

  inmuebleForm: FormGroup;
  inmuebles: Inmueble[] = [];
  inmuebleSeleccionado: Inmueble | undefined;
  currentImageIndex: number = 0;
  imagePreviews: string[] = [];
  previewAccepted: boolean = false;

  constructor(private fb: FormBuilder, private inmueblesService: InmueblesService, private modalService: NgbModal) {
    this.inmuebleForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      direccion: ['', Validators.required],
      numHabitaciones: ['', Validators.required],
      numBanios: ['', Validators.required],
      precioPorDia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getInmuebles();
  }

  getInmuebles(): void {
    this.inmueblesService.getInmuebles().subscribe((inmuebles: Inmueble[]) => this.inmuebles = inmuebles);
  }

  onSubmit(): void {
    if (this.inmuebleForm.valid && this.previewAccepted) {
      const inmueble = this.inmuebleForm.value;
      this.inmueblesService.createInmueble(inmueble, this.imagePreviews).subscribe(() => {
        this.getInmuebles();
        this.inmuebleForm.reset();
        this.imagePreviews = [];
        this.previewAccepted = false;
      });
    }
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    this.imagePreviews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
      reader.readAsDataURL(files[i]);
    }
    this.openModal(this.previewModal);
  }

  seleccionarInmueble(inmueble: Inmueble): void {
    this.inmuebleSeleccionado = inmueble;
    this.currentImageIndex = 0;
    this.openModal(this.detalleModal);
  }

  previousImage(): void {
    if (this.inmuebleSeleccionado && this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.inmuebleSeleccionado?.imagenesRutas && this.currentImageIndex < (this.inmuebleSeleccionado.imagenesRutas.length - 1)) {
      this.currentImageIndex++;
    }
  }

  acceptPreviews(): void {
    this.previewAccepted = true;
    this.closeModal();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
  }

  closeModal(): void {
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === 'ESC') {
      return 'by pressing ESC';
    } else if (reason === 'BACKDROP_CLICK') {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}







