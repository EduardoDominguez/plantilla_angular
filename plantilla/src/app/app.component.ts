import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";

import { StorageService } from "./services/storage.service";
import { LoadingService } from './services/loading.service';
import { Sesion } from './classes/Sesion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public loading: boolean;
  public _opened: boolean = false;
  public _animate: boolean = false;
  public _closeOnClickOutSide: boolean;
  public _mode: string;
  public _dock: boolean;
  public _dockedSize: string;
  //public _colapsarMenu :boolean = false; //Controla la vista del menú  

  /**Para mostrar o no cotenido en la página inicio */
  public _rutaActiva: boolean;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.storageService.getCurrentSession() == null)
          this.storageService.logout();

        this._rutaActiva = router.url === '/';
      }

    });
    //console.log(this.storageService.getCurrentSession());
  }


  ngOnInit(): void {
    //console.log(this.storageService.getCurrentSession());
    this.loading = false;
    //this._autoCollapseOnInit = false;
    this._closeOnClickOutSide = true;
    this._mode = 'push';
    this._dock = true;
    this._dockedSize = '50px';

    //Hardcodeado solo para ejemplo

    this.storageService.setCurrentSession(new Sesion());

    /*setTimeout(() => {
      if(this.cookieService.check('_opened')){
        this._opened = this.cookieService.get('_opened').toLowerCase() == 'true' ? true : false;
        //this._colapsarMenu = this._opened;
      }
    });*/

    //setTimeout(() => {
    this.loadingService.change.subscribe((isOpen: boolean) => {
      //console.log(isOpen);
      this.loading = isOpen;
    });
    //});
  }

  validaSesionActiva(): boolean {
    return this.storageService.isAuthenticated();
  }

  _toggleSidebar(mode, menu) {
    menu.toggleCollapsed(this._opened);
    this._opened = mode.menuToggler;

    //this._colapsarMenu = this._opened;
    // this.cookieService.set('_opened', String(this._opened));
  }

  onClosed(event) {
    document.getElementsByTagName("aside")[0].removeAttribute("style");
  }

  /*private _toggleLoading(event){
    console.log(event);
    this.loading = event.show;
  }*/
}
