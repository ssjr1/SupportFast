import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EstadosService } from '../../../../services/estados.service';

@Component({
  selector: 'app-nuevo-estado',
  standalone: true,
  imports:
  [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    NgIf
  ],
  templateUrl: './nuevo-estado.component.html',
  styleUrl: './nuevo-estado.component.scss'
})
export class NuevoEstadoComponent
{
  estadoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estadosService: EstadosService,
    public dialogRef: MatDialogRef<NuevoEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.estadoForm = this.fb.group({
      c_Estado: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.estadoForm.valid) {
      this.estadosService.createEstado(this.estadoForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
