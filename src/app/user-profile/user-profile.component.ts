import { Component, Input, OnInit } from '@angular/core';
import { ApiServiceService } from 'app/services/api-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  data_list: any;
  user_profile : any;
  profileFormGroup: FormGroup;
  user_id: any;
  user_profile_id: any;
  selected_user_profile_id: any;
  data_body: any;
  gender_id: any;
  male: any;
  female: any = false;
  single: any = false;
  married: any = false;
  separated: any = false;
  widowed: any = false;
  divorce: any = false;
  civil_status_id: any;
  clinical_records: any;
  has_profile: any;
  selected_clinical_id: any;
  show_clinical_modal: any = false;
  show_outpatient_modal: any = false;
  outpatients: any = { "outpatient_records":[]};

  submit_button_name: any = 'Create';
  show_sidebar_profile : any = false;
  outpatient_result: any = {};
  user_role: any;
  user_building: any;

  @Input()
  newPatient: any;;
  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder, private router: Router) { 

  }

  ngOnInit() {
    this.user_role = localStorage.getItem('user_role_id');
    this.user_building = localStorage.getItem('user_building_id');
    this.clinical_records = { };
    this.user_id = localStorage.getItem('user_id');
    this.user_profile_id = localStorage.getItem('user_profile_id');
    this.has_profile = localStorage.getItem('has_profile');

    console.log('newPatient Date: ', this.user_profile);
    this.declareFormBuilder();
    if(this.newPatient == undefined){     //from userProfile
      if(this.has_profile == 'true'){
        console.log('dito ba')
        console.log(this.has_profile);
        this.getProfile();
        this.submit_button_name = 'Update';
        this.getPatientClinicalRecords(this.user_id);
        this.getAllPatientOutPatientRecord(this.user_id);
      }else{
        this.showNotification();
      }
      
    }else{    //Profile list
      if(this.newPatient.create_new){
        this.submit_button_name = 'Create';
      }else{
        this.show_sidebar_profile = true;
        this.submit_button_name = 'Edit';
        this.profileFormGroup.disable();
        this.user_profile_id = this.newPatient.id;
        this.getProfile()
        this.getPatientClinicalRecords(this.newPatient.user_id);
        this.getAllPatientOutPatientRecord(this.newPatient.user_id);
      }
    }
  }

  newOutpatient(): void{
    this.show_outpatient_modal = true;
    this.outpatient_result = {};
    this.outpatient_result.from_user_profile = true;
    this.outpatient_result.create_new = true;
    this.outpatient_result.profile = this.user_profile;
    this.outpatient_result.record = this.clinical_records;
  }

  closeOutpatient(): void{
    this.show_outpatient_modal = false;
  }

  viewOutpatient(data) {
    this.show_outpatient_modal = true;
    console.log(data);
    data.from_user_profile = true;
    data.create_new = false;
    this.outpatient_result = data
  }

  getPatientClinicalRecords(user_id): void{
    
    this.apiService
    .patientAllClinicalRecords({user_id: user_id})
    .subscribe(
      res => {
        console.log('clinical records', res);
        this.clinical_records = res;
      },
      err => {
        alert(err.message);
      }
    )
  }

  getAllPatientOutPatientRecord(user_id): void {

    this.apiService
      .getAllPatientOutPatientRecord(user_id)
      .subscribe(
        res => {
          this.outpatients = res;
          console.log('outpatient: ', this.outpatients);
        },
        err => {
          alert(err.message);
        }
      )
  }

  getSelectedProfile(): void{
    this.selected_user_profile_id = localStorage.getItem('selected_user_profile_id');
    this.apiService
      .showProfile(this.selected_user_profile_id)
      .subscribe(
        res => {
          console.log(res);
          if(res.profile.length > 0){
            this.user_profile = res.profiles[0];
          }else{
            this.user_profile = res.profile;
          }
          this.setProfileData();
        },
        err => {
          alert(err.data.message);
        }
      )
  }

  getProfile(): void{
    console.log("user id:", this.user_profile_id);
    this.apiService
      .showProfile(this.user_profile_id)
      .subscribe(
        res => {
          console.log("showing profile:", res);
          if(res.profile.length > 0){
            this.user_profile = res.profiles[0];
          }else{
            this.user_profile = res.profile;
          }
          this.show_sidebar_profile = true;
          this.setProfileData();
        },
        err => {
          alert(err.message);
        }
      )
  }

  createNewPatient() {
    this.apiService
      .createPatient(this.data_body)
      .subscribe(
        (res: any) => {
          console.log(res);
          alert(res.message);
          this.router.navigate(['dashboard']);
        },
        (err: any) => {
          alert(err.message);
        }
      )
  }

  setProfileData(): void{
    console.log(this.user_profile);
    this.profileFormGroup.setValue({
      user_id: this.user_profile.user_id,
      surname: this.user_profile.surname,
      first_name: this.user_profile.first_name,
      middle_name: this.user_profile.middle_name,
      dob: this.user_profile.dob,
      age: this.user_profile.age,
      birth_place: this.user_profile.birth_place,
      address: this.user_profile.address,
      male: this.user_profile.gender_id == 1 ? true : false,
      female: this.user_profile.gender_id == 2 ? true : false,
      single: this.user_profile.civil_status_id == 1 ? true : false,
      married: this.user_profile.civil_status_id == 2 ? true : false,
      separated: this.user_profile.civil_status_id == 3 ? true : false,
      widowed: this.user_profile.civil_status_id == 4 ? true : false,
      divorce: this.user_profile.civil_status_id == 5 ? true : false,
      occupation: this.user_profile.occupation,
      religion: this.user_profile.religion,
      nationality: this.user_profile.nationality,
      cp_no: this.user_profile.cp_no,
      employed_by: this.user_profile.employed_by,
      person_to_notify: this.user_profile.person_to_notify,
      person_to_notify_address: this.user_profile.person_to_notify_address,
      person_to_notify_no: this.user_profile.person_to_notify_no,
      person_to_notify_cp_relationship: this.user_profile.person_to_notify_cp_relationship
    });
  }

  declareFormBuilder(): void{
    this.profileFormGroup = this.formBuilder.group({
      user_id:[ this.user_id ],
      surname: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      dob: ['', Validators.required],
      age: ['', Validators.required],
      birth_place: ['', Validators.required],
      address: ['', Validators.required],
      male: [''],
      female: [''],
      single: [''],
      married: [''],
      separated: [''],
      widowed: [''],
      divorce: [''],
      occupation: [''],
      religion: [''],
      nationality: [''],
      cp_no: [''],
      employed_by: [''],
      person_to_notify: [''],
      person_to_notify_address: [''],
      person_to_notify_no: [''],
      person_to_notify_cp_relationship: ['']
    });
  }

  formatDate(f_date): any{
    let d = f_date;
    d.setDate(d.getDate() + 1);

    return d;
  }

  onSubmit(action): void{
    console.log(action);
    if(action == 'Edit'){
      this.submit_button_name = 'Update';
      this.profileFormGroup.enable();
    }else{
      this.data_body = { profile: this.profileFormGroup.value };
      if(this.male){
        this.data_body.profile.gender_id = 1;
      }else{
        this.data_body.profile.gender_id = 2;
      }
      if(this.single){
        this.data_body.profile.civil_status_id = 1;
      }
      if(this.married){
        this.data_body.profile.civil_status_id = 2;
      }
      if(this.separated){
        this.data_body.profile.civil_status_id = 3;
      }
      if(this.widowed){
        this.data_body.profile.civil_status_id = 4;
      }
      if(this.divorce){
        this.data_body.profile.civil_status_id = 5;
      }
      delete this.data_body.profile.male;
      delete this.data_body.profile.female;
      delete this.data_body.profile.single;
      delete this.data_body.profile.married;
  
      if(this.newPatient == undefined){
        if(this.has_profile == 'true'){
          this.updateProfile();
        }else{
          this.createProfile();
        }
      }else{
        if(this.newPatient.create_new){
          this.createNewPatient();
        }else{
          this.updateProfile();
        }
      }
    }
  }

  updateProfile(): void{
    this.data_body = { profile: this.profileFormGroup.value };
    if(this.male){
      this.data_body.profile.gender_id = 1;
    }else{
      this.data_body.profile.gender_id = 2;
    }
    if(this.single){
      this.data_body.profile.civil_status_id = 1;
    }
    if(this.married){
      this.data_body.profile.civil_status_id = 2;
    }
    if(this.separated){
      this.data_body.profile.civil_status_id = 3;
    }
    if(this.widowed){
      this.data_body.profile.civil_status_id = 4;
    }
    if(this.divorce){
      this.data_body.profile.civil_status_id = 5;
    }
    delete this.data_body.profile.male;
    delete this.data_body.profile.female;
    delete this.data_body.profile.single;
    delete this.data_body.profile.married;

    this.data_body.profile.id = this.user_profile.id;
    console.log('update profile', this.data_body);

    this.apiService
      .updateProfile(this.data_body)
      .subscribe(
        res => {
          console.log(res);
          this.user_profile = res;
          alert('Updated Successfully');
          this.router.navigate(['dashboard']);
          // this.ngOnInit();
        },
        err => {
          alert(err.message);
        }
      )

  } 

  createProfile(): void{
    console.log(this.data_body);
    this.apiService
      .createProfile(this.data_body)
      .subscribe(
        res => {
          console.log(res);
          this.user_profile = res;
          localStorage.setItem('user_profile_id', this.user_profile.profile.id);
          localStorage.setItem('has_profile', 'true');
          alert('Updated Successfully');
          this.router.navigate(['dashboard']);
        },
        err =>{
          alert(err.message);
        }
      )
  }

  getList(){
    this.apiService
      .getList()
      .subscribe(res => {
        this.data_list = res;
      }, err  => {
        alert(err.message);
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

  view(id) {
    this.show_clinical_modal = true;
    this.selected_clinical_id = id;
  }  

  close() {
    this.show_clinical_modal = false;
    this.show_outpatient_modal = false;
  }

  newClinical() {
    this.selected_user_profile_id = localStorage.setItem('selected_user_profile_id', this.user_profile_id);
    this.show_clinical_modal = true;
    this.selected_clinical_id = 0;
  }

}
