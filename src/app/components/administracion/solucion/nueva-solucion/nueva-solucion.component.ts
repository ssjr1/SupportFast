import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatPseudoCheckboxModule } from "@angular/material/core";
import { SolucionesService } from "../../../../services/soluciones.service";

@Component({
  selector: 'app-nueva-solucion',
  standalone: true,
  imports:
  [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPseudoCheckboxModule,
    ReactiveFormsModule
  ],
  templateUrl: './nueva-solucion.component.html',
  styleUrls: ['./nueva-solucion.component.scss']
})
export class NuevaSolucionComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NuevaSolucionComponent>,
    private solucionService: SolucionesService
  ) {
    this.form = this.fb.group({
      c_Solucion: ['', Validators.required],
      l_Solucion_Definitiva: [false]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.solucionService.createSolucion(this.form.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Error al guardar la solución:', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
