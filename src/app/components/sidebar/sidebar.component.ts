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
  user_role: any;
  user_building: any;

  constructor() { }

  ngOnInit() {
    this.user_role = localStorage.getItem('user_role_id');
    this.user_building = localStorage.getItem('user_building_id');

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    // switch (this.user_role) {
    //   case '1':
    //     this.menuItems = ROUTES.filter(menuItem => menuItem);
    //     this.menuItems = [this.menuItems[1],this.menuItems[6]];
    //     console.log(this.menuItems);
    //     break;
    //   case '2':
    //     this.menuItems = ROUTES.filter(menuItem => menuItem);
    //     this.menuItems = [this.menuItems[1],this.menuItems[2],this.menuItems[6]];
    //     break;
    //   case '3':
    //     this.menuItems = ROUTES.filter(menuItem => menuItem);
    //     if(this.user_building == 1){
    //       this.menuItems = [this.menuItems[0],this.menuItems[1],this.menuItems[2],this.menuItems[3],this.menuItems[6]];
    //     }else{
    //       this.menuItems = [this.menuItems[0],this.menuItems[1],this.menuItems[2],this.menuItems[3],this.menuItems[4],this.menuItems[6]];
    //     }
    //     break;
    //   case '4':
    //     this.menuItems = ROUTES.filter(menuItem => menuItem);
    //     if(this.user_building == 1){
    //       this.menuItems = [this.menuItems[0],this.menuItems[1],this.menuItems[2],this.menuItems[3],this.menuItems[5],this.menuItems[6]];
    //     }
    //     break;
    
    //   default:
    //     this.menuItems = ROUTES.filter(menuItem => menuItem);
    //     break;
    // }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
