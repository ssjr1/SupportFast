import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { CategoriaService } from '../../../service/categoria.service';
import { Categoria } from '../../../modelos/Categoria';
import { EstadosService } from '../../../service/estados.service';
import { Estado } from '../../../modelos/Estado';

@Component({
  selector: 'app-estado',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDatepickerModule, RouterOutlet,
    RouterLink, MatSelectModule, FormsModule,
    ReactiveFormsModule, MatDividerModule,],
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.scss'
})
export class EstadoComponent {
  catForm: FormGroup;
  idEstado: number;
  selectedValue!: string;

  estado: any[] = [
    { id: 0, viewValue: 'anulado' },
    { id: 1, viewValue: 'Activo' },
    { id: 2, viewValue: 'Inactivo' },
    { id: 3, viewValue: 'en progreso' },

  ];

  constructor(private _estadoService: EstadosService,
    private aRoute: ActivatedRoute, private snackBar: MatSnackBar,
    private _fb: FormBuilder) {
    this.idEstado = Number(this.aRoute.snapshot.paramMap.get('id'))

    this.catForm = this._fb.group({
      nombre: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
    })
  }

  ngOnInit() {
    if (this.idEstado > 0) {
      this.editar();
    }

  }

  addEstado(): void {
    const estado: Estado = {
      c_Estado: this.catForm.value.nombre,
      fecha: this.catForm.value.fechaCreacion,
      descripcion: this.catForm.value.descripcion,
      estado: this.catForm.value.estado,
    }

    this._estadoService.addEstado(estado).subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('Obtención de estados completa');
        this.snackBar.open('Estado guardado', 'Cerrar', {
          duration: 3000, // Duración del snackbar en milisegundos (opcional)
          verticalPosition: 'top'
        });
      }

    });
  }

  editar(): void {


    if (this.idEstado === undefined) {
      alert('El ID del estado es indefinido');
      return;

    }

    console.log('datos', this.idEstado);
    this._estadoService.getEstadoId(this.idEstado).subscribe({
      next: data => {
        console.log('datos', data);
        this.catForm.patchValue({
          nombre: data.c_Estado,
          fecha: data.fecha,
          descripcion: data.descripcion,
          estado: data.estado
        });
      }
      ,
      error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('obtener Estados');

      }
    });
  }

  modificar() {


    const estado: Estado = {

      id: this.idEstado,
      c_Estado: this.catForm.value.nombre,
      fecha: this.catForm.value.fechaCreacion,
      descripcion: this.catForm.value.descripcion,
      estado: this.catForm.value.estado
    }


    this._estadoService.modificarEstado(estado).subscribe({
      next: data => {
        console.log(data);

      },
      error: error => {
        alert("Ocurrio un error");
      },
      complete: () => {

        console.info('Obtencion de modificaciones');
        this.snackBar.open('Estado Actualizado', 'Cerrar', {
          duration: 3000, // Duración del snackbar en milisegundos (opcional)
          verticalPosition: 'top'
        });
      }
    });
  }

  guardar() {

    if (this.idEstado > 0) {
      this.modificar();
    } else {

      this.addEstado();
    }


  }
}



