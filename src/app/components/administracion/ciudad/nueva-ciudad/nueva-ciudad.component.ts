import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-nueva-ciudad',
  standalone: true,
  imports:
  [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './nueva-ciudad.component.html',
  styleUrl: './nueva-ciudad.component.scss'
})
export class NuevaCiudadComponent
{
  ciudadForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NuevaCiudadComponent>,
    private fb: FormBuilder
  ) {
    this.ciudadForm = this.fb.group({
      c_Ciudad: ['', Validators.required]
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
