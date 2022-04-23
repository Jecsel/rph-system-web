import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { UserComponent } from '../../user/user.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClinicalRecordComponent } from 'app/clinical-record/clinical-record.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { OutpatientRecordComponent } from 'app/outpatient-record/outpatient-record.component';
import { NgxPrintModule } from 'ngx-print';
import { CreateAccountComponent } from 'app/create-account/create-account.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectSearchModule } from 'mat-select-search';
import { ClinicalListComponent } from 'app/clinical-list/clinical-list.component';
import { NurseListComponent } from 'app/nurse-list/nurse-list.component';
import { DoctorListComponent } from 'app/doctor-list/doctor-list.component';
import { AdminListComponent } from 'app/admin-list/admin-list.component';
import { AboutUsComponent } from 'app/about-us/about-us.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { Angular2CsvModule } from 'angular2-csv';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    NgxPrintModule,
    MatCardModule,
    MatSelectSearchModule,
    GoogleChartsModule,
    Angular2CsvModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    UserComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ClinicalRecordComponent,
    OutpatientRecordComponent,
    CreateAccountComponent,
    ClinicalListComponent,
    NurseListComponent,
    DoctorListComponent,
    AdminListComponent,
    AboutUsComponent
  ]
})

export class AdminLayoutModule {}
