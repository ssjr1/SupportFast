import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Tecnicos } from '../../../../models/tecnicos.model';

@Component({
  selector: 'app-nuevo-tecnico',
  standalone: true,
  imports: [ MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    NgIf,],
  templateUrl: './nuevo-tecnico.component.html',
  styleUrl: './nuevo-tecnico.component.scss'
})
export class NuevoTecnicoComponent {
  tecnicoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NuevoTecnicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tecnicos
  ) {
    this.tecnicoForm = this.fb.group({
      //id: [data?.id || '', Validators.required],
      c_Tecnico: [data?.nombreTecnico || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.tecnicoForm.valid) {
      this.dialogRef.close(this.tecnicoForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
