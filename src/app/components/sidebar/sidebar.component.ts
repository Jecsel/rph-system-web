import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/patient-list', title: 'Patients',  icon:'location_on', class: '' },
    { path: '/clinical-case-list', title: 'Clinical Case List',  icon:'content_paste', class: '' },
    { path: '/outpatient-record', title: 'Outpatient Record List',  icon:'bubble_chart', class: '' },
    { path: '/accounts', title: 'Accounts',  icon:'library_books', class: '' },  
    // { path: '/user', title: 'User',  icon:'person', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '', title: 'Logout',  icon:'logout', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
