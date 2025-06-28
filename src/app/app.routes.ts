import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';
import { ServiceRequestsComponent } from './requests/service-requests/service-requests.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: "full"
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainlayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'servicerequest',
                component: ServiceRequestsComponent
            }
        ]
    }
];
