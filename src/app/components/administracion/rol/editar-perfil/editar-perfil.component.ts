import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Perfiles } from '../../../../models/perfiles.model';
import { NgIf } from '@angular/common';
import { PerfilesService } from '../../../../services/perfiles.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private perfilesService: PerfilesService,
    public dialogRef: MatDialogRef<EditarPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Perfiles
  ) {
    /*this.form = this.fb.group({
      id: [data.id],
      c_Perfil: [data.c_Perfil, Validators.required]
    });*/
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.fb.group({
      id: [this.data.id],
      c_Perfil: [this.data.c_Perfil, Validators.required]
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
