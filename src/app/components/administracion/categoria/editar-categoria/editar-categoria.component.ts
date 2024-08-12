import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Categorias } from '../../../../models/categorias.model';
@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.scss'
})
export class EditarCategoriaComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categorias
  ) {
    this.form = this.fb.group({
      id: [data.id],
      c_Categoria: [data.c_Categoria, Validators.required],
      id_TecnicoDefault: [data.id_TecnicoDefault, Validators.required]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
