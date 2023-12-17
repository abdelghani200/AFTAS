import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionComponent } from './components/competition/competition.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { JugementComponent } from './components/jugement/jugement.component';
import { PodiumComponent } from './components/podium/podium.component';
import { DetailsPodiumComponent } from './components/details-podium/details-podium.component';
import { MembersComponent } from './components/members/members.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'competitions', component: CompetitionComponent},
  { path: 'details/:code', component: DetailsComponent},
  { path: 'jugement/:id', component: JugementComponent},
  {path: 'resultats', component: PodiumComponent},
  {path: 'resultats/:code', component: DetailsPodiumComponent},
  {path: 'members', component: MembersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
