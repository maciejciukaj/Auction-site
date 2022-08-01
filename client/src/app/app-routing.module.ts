import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertismentsComponent } from './advertisments/advertisments.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'log', component: LoginPageComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'main', component: MainComponent },
      { path: 'auc', component: AuctionsComponent },
      { path: 'adv', component: AdvertismentsComponent },
    ],
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
