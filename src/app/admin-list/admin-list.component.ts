import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/services/api-service.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  public all_patients: any;
  public show_profile_modal = false;
  public selected_user_id: any;
  public new_patient: any;
  public building_1: any = true;
  public building_2: any = true;
  public male: any = true;
  public female: any = true;
  public search_key: any = '';
  public user_data: any = {};

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.getAllAdmins();
    this.new_patient = false;
    this.selected_user_id = undefined;
  }

  getAllAdmins() {
    this.apiService
      .getAllAdmins()
      .subscribe(
        res => {
          console.log(res);
          this.all_patients = res.patients;
        },
        err =>{
          alert(err.message);
        }
      )
  }

  viewPatient(user) {
    this.new_patient = false;
    this.user_data = user;
    this.user_data.create_new = false;
    this.show_profile_modal= true;
  }

  addPatient(user_type) {
    this.user_data = { "create_new": true, "user_type": user_type };

    this.new_patient = true;
    this.show_profile_modal= true;
  }

  close() {
    this.ngOnInit();
    this.show_profile_modal= false;
  }

  add(){

  }

  filter() {
    console.log(this.building_1 + " " + this.building_2);
    let building_id = this.building_1
    if(this.building_1 && this.building_2){
      building_id = 0;
    }else{
      if(this.building_1){
        building_id = 1;
      }
      if(this.building_2){
        building_id = 2;
      }
    }

    this.apiService
      .filterPatients({"building_id": building_id})
      .subscribe(
        (res: any) => {
          this.all_patients = res.patients;
          console.log(res);
        },
        (err: any) => {
          alert(err.message)
        }
      )
  }

  search() {
    console.log(this.search_key);
    this.apiService
      .search_patient({ "search_key": this.search_key })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.all_patients = res.patients;
        },
        (err: any) => {
          alert(err.message);
        }
      )
  }

}
