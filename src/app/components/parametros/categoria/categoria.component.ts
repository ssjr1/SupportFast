
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
import { Estado } from '../../../modelos/Estado';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-categoria',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDatepickerModule, RouterOutlet,
    RouterLink, MatSelectModule, FormsModule,
    ReactiveFormsModule, MatDividerModule,
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {

  catForm: FormGroup;
  idCategoria: number;
  selectedValue!: string;

  estado: any[] = [
    { id: 1, viewValue: 'Activo' },
    { id: 0, viewValue: 'Inactivo' },
  ];

  constructor(private _categoriaService: CategoriaService,
    private aRoute: ActivatedRoute, private snackBar: MatSnackBar,
    private _fb: FormBuilder) {
    this.idCategoria = Number(this.aRoute.snapshot.paramMap.get('id'))
    console.log(this.idCategoria);
    this.catForm = this._fb.group({
      nombre: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
    })
  }

  ngOnInit() {
    if (this.idCategoria > 0) {
      this.editar();
    }

  }

  addCategoria(): void {
    const categoria: Categoria = {
      c_Categoria: this.catForm.value.nombre,
      fecha: this.catForm.value.fechaCreacion,
      descripcion: this.catForm.value.descripcion,
      estado: this.catForm.value.estado

    }

    this._categoriaService.addCategoria(categoria).subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('Obtención de Categorias completa');
        this.snackBar.open('Producto guardado', 'Cerrar', {
          duration: 3000, // Duración del snackbar en milisegundos (opcional)
          verticalPosition: 'top'
        });
      }

    });
  }

  editar(): void {


    if (this.idCategoria === undefined) {
      alert('El ID del pedido es indefinido');
      return;

    }

    console.log('datos', this.idCategoria);
    this._categoriaService.getCategoriaId(this.idCategoria).subscribe({
      next: data => {
        console.log('datos', data);
        this.catForm.patchValue({
          nombre: data.c_Categoria,
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
        console.info('obtener Categorias');

      }
    });
  }

  modificar() {
    const categoria: Categoria = {

      id: this.idCategoria,
      c_Categoria: this.catForm.value.nombre,
      fecha: this.catForm.value.fechaCreacion,
      descripcion: this.catForm.value.descripcion,
      estado: this.catForm.value.estado
    }


    this._categoriaService.modificarCategoria(categoria).subscribe({
      next: data => {
        console.log(data);

      },
      error: error => {
        alert("Ocurrio un error");
      },
      complete: () => {

        console.info('Obtencion de modificaciones');
        this.snackBar.open('Producto Actualizado', 'Cerrar', {
          duration: 3000, // Duración del snackbar en milisegundos (opcional)
          verticalPosition: 'top'
        });
      }
    });
  }

  guardar() {

    if (this.idCategoria > 0) {
      this.modificar();
    } else {

      this.addCategoria();
    }


  }
}




