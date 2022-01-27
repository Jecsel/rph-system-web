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
  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.getAllPatients();
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

  viewPatient(user_id) {
    console.log('select', user_id);
    this.selected_user_id = user_id;
    localStorage.setItem('user_profile_id', user_id);
    this.show_profile_modal= true;
  }

  show() {
    this.show_profile_modal= true;
  }

  close() {
    this.show_profile_modal= false;
  }

  add(){

  }

}
