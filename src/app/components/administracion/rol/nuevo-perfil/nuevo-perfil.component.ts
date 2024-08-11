import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PerfilesService } from '../../../../services/perfiles.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Perfiles } from '../../../../models/perfiles.model';

@Component({
  selector: 'app-nuevo-perfil',
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
  templateUrl: './nuevo-perfil.component.html',
  styleUrl: './nuevo-perfil.component.scss'
})
export class NuevoPerfilComponent
{
  perfilForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private perfilesService: PerfilesService,
    public dialogRef: MatDialogRef<NuevoPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Perfiles
  ) {
    this.perfilForm = this.fb.group({
      //id: [{ value: data ? data.id : null, disabled: true }],
      c_Perfil: [data ? data.c_Perfil : '', Validators.required]
    });
  }

  onSave(): void {
    if (this.perfilForm.valid) {
      const perfil: Perfiles = this.perfilForm.value;
      this.perfilesService.createPerfil(perfil).subscribe({
        next: (result) => {
          this.dialogRef.close(result);
        },
        error: (error) => {
          console.error('Error al guardar el perfil:', error);
        }
      });
    } else {
      console.log('Formulario inválido', this.perfilForm);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
