import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NuevoTecnicoComponent } from '../../tecnico/nuevo-tecnico/nuevo-tecnico.component';
import { Categorias } from '../../../../models/categorias.model';

@Component({
  selector: 'app-nueva-categoria',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    NgIf,],
  templateUrl: './nueva-categoria.component.html',
  styleUrl: './nueva-categoria.component.scss'
})
export class NuevaCategoriaComponent {
  categoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NuevoTecnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categorias
  ) {
    this.categoriaForm = this.fb.group({
      //id: [data?.id || '', Validators.required],
      c_Categoria: [data?.c_Categoria || '', Validators.required],
      id_TecnicoDefault: [data?.id_TecnicoDefault || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.categoriaForm.valid) {
      this.dialogRef.close(this.categoriaForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
