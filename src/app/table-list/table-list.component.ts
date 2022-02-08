import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/services/api-service.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  clinical_records: any;
  constructor(private apiService: ApiServiceService) { }
  show_clinical_modal: any;
  selected_clinical_id: any;
  building_1: any = true;
  building_2: any = true;
  
  ngOnInit() {
    this.show_clinical_modal = false;
    this.getAllClinicalRecords();
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
      .filterClinical({'building_id': building_id})
      .subscribe(
        (res: any) => {
          console.log(res);
          this.clinical_records = res.clinical_records
        },
        (err: any) => {
          alert(err.message);
        }
      )
  }

  close() {
    this.show_clinical_modal = false;
  }

  view(id) {
    this.selected_clinical_id = id;
    this.show_clinical_modal = true;
  }

  getAllClinicalRecords() {
    this.apiService
      .allClinicalRecords()
      .subscribe(
        res =>{
          console.log(res);
          this.clinical_records = res.clinical_records;
        },err => {
          alert(err.message);
        }
      )
  }
}
