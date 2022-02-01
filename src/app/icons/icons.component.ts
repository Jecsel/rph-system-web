import { Component, OnInit } from '@angular/core';
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
  constructor(private apiService: ApiServiceService) { }

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

}
