import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Soluciones } from '../../../../models/soluciones.model';
import { SolucionesService } from '../../../../services/soluciones.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-editar-solucion',
  standalone: true,
  imports:
  [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './editar-solucion.component.html',
  styleUrl: './editar-solucion.component.scss'
})
export class EditarSolucionComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solucionesService: SolucionesService,
    private dialogRef: MatDialogRef<EditarSolucionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Soluciones
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [{ value: this.data.id, disabled: true }],
      c_Solucion: [this.data.c_Solucion, Validators.required],
      l_Solucion_Definitiva: [this.data.l_Solucion_Definitiva]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.solucionesService.updateSolucion(this.data.id, this.form.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
