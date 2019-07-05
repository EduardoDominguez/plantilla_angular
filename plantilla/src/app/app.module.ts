import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

/**Componentes externos npm */
import { ToastrModule } from 'ngx-toastr';
import { SidebarModule } from 'ng-sidebar';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

//Angular material
import {
  MatTableModule, MatInputModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule,
  MatFormFieldModule, MatSelectModule, MatToolbarModule, MatIconModule, MatButtonModule,
  MatTooltipModule, MatTabsModule, MatMenuModule, MatPaginatorIntl, MatSlideToggleModule
} from '@angular/material';

/**Componentes */
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { NodosComponent } from './components/nodos/nodos.component';

/**Animaciones */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**Servicios */
import { globals } from './globals/globals';
import { TitleService } from './services/title.service';
//Servicio para loading
import { LoadingService } from './services/loading.service';
//Servicios para toast
import { AlertService } from "./services/alert.service";
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    NotfoundComponent,
    HomeComponent,
    NodosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //Servicio para alertas
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    }),
    //Componente de menú lateral
    SidebarModule.forRoot(),
    //Block loading
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.2)',
      backdropBorderRadius: '4px',
      primaryColour: '#004CBD',
      secondaryColour: '#f6901e',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
    }),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  providers: [globals, TitleService, LoadingService, AlertService, /*{ provide: MatPaginatorIntl, useClass: PaginatorEspañol },*/ {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi   : true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(titleService: TitleService) {
    titleService.init();
  }
}
