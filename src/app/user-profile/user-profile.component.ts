import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/services/api-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  data_list: any;
  user_profile : any;
  profileFormGroup: FormGroup;
  user_id: any;
  user_profile_id: any;
  data_body: any;
  gender_id: 2 | 1 = 1;
  civil_status_id: 2 | 1 = 1;
  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let has_profile = localStorage.getItem('has_profile');
    this.user_id = localStorage.getItem('user_id');
    this.user_profile_id = localStorage.getItem('user_profile_id');

    if( has_profile == 'false' ){
      this.showNotification();
    }else{
      this.getProfile();
    }
    this.getList();
    this.declareFormBuilder();
  }

  getProfile(): void{
    this.apiService
      .showProfile(this.user_profile_id)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          alert(err.data.message);
        }
      )
  }

  declareFormBuilder(): void{
    this.profileFormGroup = this.formBuilder.group({
      user_id:[this.user_id],
      surname: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      birth_place: ['', Validators.required],
      gender_id: [''],
      civil_status_id: [''],
      occupation: ['', Validators.required],
      religion: ['', Validators.required],
      nationality: ['', Validators.required],
      cp_no: ['', Validators.required],
      employed_by: ['', Validators.required],
      person_to_notify: ['', Validators.required],
      person_to_notify_address: ['', Validators.required],
      person_to_notify_no: ['', Validators.required],
      person_to_notify_cp_relationship: ['', Validators.required]
    });
  }

  onSubmit(): void{
    this.data_body = { profile: this.profileFormGroup.value };
    this.data_body.profile.gender_id = this.gender_id;
    this.data_body.profile.civil_status_id = this.civil_status_id;
    delete this.data_body.profile.male;
    delete this.data_body.profile.female;
    delete this.data_body.profile.single;
    delete this.data_body.profile.married;

    console.log(this.data_body);
    this.apiService
      .createProfile(this.data_body)
      .subscribe(
        res => {
          console.log(res);
          this.user_profile = res;
          localStorage.setItem('user_profile_id', this.user_profile.profile.id);
        },
        err =>{
          alert(err.data.message);
        }
      )
  }

  getList(){
    this.apiService
      .getList()
      .subscribe(res => {
        this.data_list = res;
      }, err  => {
        alert(err.data.message);
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
