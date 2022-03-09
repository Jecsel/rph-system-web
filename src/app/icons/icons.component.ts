import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'app/services/api-service.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  outpatient_records: any = [];
  show_modal: boolean = false;
  outpatient_result: any = [];
  id_to_delete: any = 0;

  constructor(private apiService: ApiServiceService, private router: Router) { }

  ngOnInit() {
    this.outpatient_result = '';
    this.getOutpatientRecords();
  }

  print() {
    const printContent = document.getElementById("outpatient");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

  view(data) {
    this.outpatient_result = data;
    this.outpatient_result.from_user_profile = false;
    this.outpatient_result.create_new = false;
    this.show_modal = true;
  }

   close(){
     this.show_modal = false;
   }

  getOutpatientRecords(){
    this.apiService
      .getAllOutPatientRecord()
      .subscribe(
        res => {
          console.log(res);
          this.outpatient_records = res;
        },
        err =>{
          alert(err.message);
        }
      )
      
  }

  setIdToDelete(id){
    this.id_to_delete = id;
  }

  deleteRecord(){
    this.apiService
      .deleteOutpatientRecord(this.id_to_delete)
      .subscribe(
        res =>{
          console.log(res);
          alert('Record Deleted!')
          this.router.navigate(['dashboard']);
        },err => {
          alert(err.message);
        }
      )
  }

}
