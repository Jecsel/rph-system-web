import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/services/api-service.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  all_patients: any;
  show_profile_modal = false;
  selected_user_id: any;
  new_patient: any;

  user_data: any = {}
  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.getAllPatients();
    this.new_patient = false;
    this.selected_user_id = undefined;
  }

  getAllPatients() {
    this.apiService
      .getAllPatients()
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

  addPatient() {
    this.user_data = { "create_new": true };

    this.new_patient = true;
    this.show_profile_modal= true;
  }

  close() {
    this.ngOnInit();
    this.show_profile_modal= false;
  }

  add(){

  }

}
