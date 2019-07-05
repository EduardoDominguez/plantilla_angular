import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Nodo } from '../../classes/Nodo';
import { AlertService } from "../../services/alert.service";
import { NodosService } from "../../services/nodos.service";
import { ActualizaEstatusGenericoRequest } from '../../classes/Request/ActualizaEstatusGenericoRequest';
import { ComunService } from '../../services/comun.service';
import { StorageService } from 'src/app/services/storage.service';
import { globals } from '../../globals/globals';

@Component({
  selector: 'app-nodos',
  templateUrl: './nodos.component.html',
  styleUrls: ['./nodos.component.scss']
})
export class NodosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'estatus', 'acciones'];
  dataSource : any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private nodoService: NodosService,
    private mensajes: AlertService,
    private comunesService: ComunService,
    private storageService: StorageService,
    public globales: globals, 
     ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getNodos();
    });
  }

  /**
   * Función para filtrar contenido de la tabla 
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Inicializa opciones de la tabla, como paginador y ordenamiento
   */
  initOptionsMattable(){
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Cambia el estatus de un registro
   * @param pElement 
   * @param pId 
   */
  onChangeEstatus(pElement: any, pId: number) {
    let request = new ActualizaEstatusGenericoRequest(pId, pElement.checked, this.storageService.getCurrentSession().user.idpersona, 'nodo');
    this.comunesService.actualizaEstatus(request).subscribe(
      respuesta => {
        if (respuesta.estatus) {
          this.getNodos()
        } else {
          pElement.checked = !pElement.checked;
          this.mensajes.showWarning(respuesta.mensaje);
        }
      }, error => {
        this.mensajes.showError(error.message);
      })
  }

  /**
   * Consume servicio para consultar nodos.
   */
  private getNodos() :void {
    this.nodoService.getNodos(null, false).subscribe(
      respuesta => {
        if (respuesta.estatus){
          this.dataSource = new MatTableDataSource<Nodo>(respuesta.data.nodos);
          this.initOptionsMattable();
        }else
          this.mensajes.showWarning(respuesta.mensaje);
      }, error => {
        this.mensajes.showError(error.message);
      });
  }
}
