import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { tecnico } from '../../../models/tecnicos.model';
import { TecnicoService } from '../../../services/tecnicos.service';

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatPaginatorModule, MatSortModule, MatFormFieldModule],
  templateUrl: './tecnico.component.html',
  styleUrl: './tecnico.component.scss'
})
export class TecnicoComponent {

  listaTecnico: tecnico[] = [];
  displayedColumns: string[] = ['id', 'nombreTecnico'];
  dataSource!: MatTableDataSource<tecnico>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.ConsultarTecnico();
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(private _tecnicoService: TecnicoService) {  

  }

  ConsultarTecnico() {
  
    this._tecnicoService.getTecnico().subscribe({
      next: data => {
        console.log(data);
        this.listaTecnico = data;
        this.dataSource = new MatTableDataSource(this.listaTecnico);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('Ciudad Obtenida');
      }    
    }
  );
  }

}
