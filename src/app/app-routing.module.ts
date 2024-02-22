import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AvEnginnerComponent } from './av-enginner/av-enginner.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  {path : '', component: HomePageComponent},
  {path: 'home-page',component: HomePageComponent},
  { path: 'login-page', component: LoginPageComponent },
  { path: 'avEngineer-dashboard', component: AvEnginnerComponent},
  { path: 'admin-page', component: AdminPageComponent},
  // { path: 'av-about', component: AvAboutComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
