import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { ciudad } from '../../../models/ciudad.model';
import { CiudadService } from '../../../services/ciudad.service';

@Component({
  selector: 'app-ciudad',
  standalone: true,
  imports: [ MatTableModule, MatPaginatorModule, MatPaginatorModule, MatSortModule, MatFormFieldModule],
  templateUrl: './ciudad.component.html',
  styleUrl: './ciudad.component.scss'
})
export class CiudadComponent {

  listaCiudad: ciudad[] = [];
  displayedColumns: string[] = ['id', 'nombreCiudad'];
  dataSource!: MatTableDataSource<ciudad>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.ConsultarCiudad();
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(private _ciudadService: CiudadService) {  

  }
  
  ConsultarCiudad() {
  
    this._ciudadService.getCiudad().subscribe({
      next: data => {
        console.log(data);
        this.listaCiudad = data;
        this.dataSource = new MatTableDataSource(this.listaCiudad);
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
