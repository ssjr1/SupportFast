import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { tecnico } from '../../../models/tecnico.model';
import { TecnicoService } from '../../../services/tecnico.service';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tecnico',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, RouterModule],
  templateUrl: './tecnico.component.html',
  styleUrl: './tecnico.component.scss'
})
export class TecnicoComponent {

  listaTecnico: tecnico[] = [];
  displayedColumns: string[] = ['id', 'c_Tecnico'];
  dataSource!: MatTableDataSource<tecnico>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 
  constructor(private _tecnicoService: TecnicoService) {  
    this.dataSource = new MatTableDataSource<tecnico>([]);
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  
  ConsultarTecnico() {
  
    this._tecnicoService.getTecnico().subscribe({
      next: data => {
        console.log(data);
        this.listaTecnico = data;
        this.dataSource = new MatTableDataSource(this.listaTecnico);
        
      }, error: error => {
        alert("Ocurrió un error");
      },
      complete: () => {
        console.info('Tecnico Obtenido');
      }    
    }
  );
  }

}
