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
  
  ngOnInit() {
    this.show_clinical_modal = false;
    this.getAllClinicalRecords();
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
