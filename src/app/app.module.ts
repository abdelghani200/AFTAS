import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CompetitionComponent } from './components/competition/competition.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './shared/form/form.component';
import { DetailsComponent } from './components/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JugementComponent } from './components/jugement/jugement.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsFishComponent } from './components/details-fish/details-fish.component';
import { PodiumComponent } from './components/podium/podium.component';
import { DetailsPodiumComponent } from './components/details-podium/details-podium.component';
import { MembersComponent } from './components/members/members.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CompetitionComponent,
    FormComponent,
    DetailsComponent,
    JugementComponent,
    DetailsFishComponent,
    PodiumComponent,
    DetailsPodiumComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
