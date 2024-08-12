import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tecnicos } from '../../../../models/tecnicos.model';

@Component({
  selector: 'app-editar-tecnico',
  standalone: true,
  imports: [MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf],
  templateUrl: './editar-tecnico.component.html',
  styleUrl: './editar-tecnico.component.scss'
})
export class EditarTecnicoComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarTecnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tecnicos
  ) {
    this.form = this.fb.group({
      id: [data.id],
      c_Tecnico: [data.nombreTecnico, Validators.required]
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
