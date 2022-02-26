import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { UserComponent } from '../../user/user.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ClinicalListComponent } from 'app/clinical-list/clinical-list.component';
import { NurseListComponent } from '../../nurse-list/nurse-list.component';
import { DoctorListComponent } from 'app/doctor-list/doctor-list.component';
import { AdminListComponent } from 'app/admin-list/admin-list.component';
import { AboutUsComponent } from 'app/about-us/about-us.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'clinical-case-list',     component: TableListComponent },
    { path: 'accounts',       component: TypographyComponent },
    { path: 'outpatient-record',          component: IconsComponent },
    { path: 'patient-list',           component: MapsComponent },
    { path: 'user',           component: UserComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'clinical_list',        component: ClinicalListComponent },
    { path: 'nurse-list',        component: NurseListComponent },
    { path: 'doctor-list',        component: DoctorListComponent },
    { path: 'admin-list',        component: AdminListComponent },
    { path: 'about-us',        component: AboutUsComponent },
];
