import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ciudades } from '../../../../models/ciudades.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editar-ciudad',
  standalone: true,
  imports:
  [
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './editar-ciudad.component.html',
  styleUrl: './editar-ciudad.component.scss'
})
export class EditarCiudadComponent
{
  ciudadForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarCiudadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ciudades,
    private fb: FormBuilder
  ) {
    // Inicializa el formulario con los datos recibidos
    this.ciudadForm = this.fb.group({
      id: [data.id],
      c_Ciudad: [data.cCiudad, Validators.required]
    });
  }

  onSave(): void {
    if (this.ciudadForm.valid) {
      this.dialogRef.close(this.ciudadForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
