import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Areas } from '../../../../models/areas.model';

@Component({
  selector: 'app-nueva-area',
  standalone: true,
  imports:
  [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    NgIf,
  ],
  templateUrl: './nueva-area.component.html',
  styleUrl: './nueva-area.component.scss'
})
export class NuevaAreaComponent
{
  areaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NuevaAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Areas
  ) {
    this.areaForm = this.fb.group({
      //id: [data?.id || '', Validators.required],
      c_Area: [data?.c_Area || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.areaForm.valid) {
      this.dialogRef.close(this.areaForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}