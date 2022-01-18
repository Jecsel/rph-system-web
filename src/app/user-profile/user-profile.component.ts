import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/services/api-service.service';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  data_list: any
  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    let has_profile = localStorage.getItem('has_profile');

    if( has_profile == 'false' ){
      this.showNotification();
    }
    this.getList();
  }

  getList(){
    this.apiService
      .getList()
      .subscribe(res => {
        this.data_list = res.data;
      }, error  => {
        alert(error.data.message);
      });
  }

  showNotification(){
    console.log('show notif');
    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Hi! <b>Please</b> complete your profile first."

    },{
        type: 'info',
        timer: 1000,
        placement: {
            from: 'top',
            align: 'center'
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}
