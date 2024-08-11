import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Estados } from '../../../../models/estados.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editar-estado',
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
  templateUrl: './editar-estado.component.html',
  styleUrl: './editar-estado.component.scss'
})
export class EditarEstadoComponent
{
  editEstadoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estados
  ) {}

  ngOnInit(): void {
    this.editEstadoForm = this.fb.group({
      id: [this.data.id],
      c_Estado: [this.data.c_Estado, Validators.required]
    });
  }

  onSave() {
    if (this.editEstadoForm.valid) {
      this.dialogRef.close(this.editEstadoForm.value);
    }
  }
}
