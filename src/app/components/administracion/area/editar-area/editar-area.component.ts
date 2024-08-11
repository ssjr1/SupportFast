import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Areas } from '../../../../models/areas.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editar-area',
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
  templateUrl: './editar-area.component.html',
  styleUrl: './editar-area.component.scss'
})
export class EditarAreaComponent
{
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Areas
  ) {
    this.form = this.fb.group({
      id: [data.id],
      c_Area: [data.c_Area, Validators.required]
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
