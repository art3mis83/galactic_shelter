import { Routes } from '@angular/router';
import {CreaturesList} from './creatures-list/creatures-list';
import {LandingPage} from './landing-page/landing-page';
import {AdminComponent} from './admin/admin'
import {AdminManageComponent} from './admin-manage/admin-manage';
import {LoginComponent} from './login/login';
import {adminGuard} from './services/admin.guard';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'creatures', component: CreaturesList },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: 'admin/manage', component: AdminManageComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
