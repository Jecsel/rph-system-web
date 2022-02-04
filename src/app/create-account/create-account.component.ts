import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'app/services/api-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  hide = true;
  form: FormGroup;
  data: any;
  error_message: any;
  data_list: any = {};
  submit_button_name = 'Create'
  req_body: any = {};
  accountFormGroup: FormGroup;
  
  @Input()
  accountRecord: any = {};
  
  constructor(private router: Router, private apiService: ApiServiceService, private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    console.log("update modal: ", this.accountRecord);
    this.setFormBuilder();
    this.getList();

    if(this.accountRecord.create_new){
      this.submit_button_name = 'Create'
    }else{
      this.submit_button_name = 'Update'
      this.setValueFormBuilder()
    }
  }

  getList(){
    this.apiService
    .getList()
    .subscribe(res => {
      this.data_list = res;
      console.log(this.data_list);
    }, err  => {
      alert(err.message);
    });
  }

  setFormBuilder() {
    this.accountFormGroup = this.formBuilder.group({
      id: 1,
      username: ['', Validators.required],
      password: ['', Validators.required],
      user_type_id: ['', Validators.required],
      user_role_id: ['', Validators.required],
      building_id: ['', Validators.required]
    });
  }

  setValueFormBuilder() {
    console.log('Update: ', this.accountRecord.id);
    this.accountFormGroup.setValue({
      id: this.accountRecord.id,
      username: this.accountRecord.username,
      password: this.accountRecord.password,
      user_type_id: this.accountRecord.user_type_id,
      user_role_id: this.accountRecord.user_role_id,
      building_id: this.accountRecord.building_id,
    })
  }

  submit(){
    this.req_body = { user: this.accountFormGroup.value };
    if(this.accountRecord.create_new){
      this.registerUser();
    }else{
      this.updateUser();
    }
  }

  updateUser(): void{
    this.req_body.user.is_active = true;
    this.apiService
    .updateUser(this.req_body)
    .subscribe(
      res => {
        console.log(res);
        alert('Updated Successfully')
      },
      err => {
        alert(err.message);
      }
    )
  }

  registerUser(): void {
    console.log('Register: ', this.req_body);
    this.apiService
      .registerUser(this.req_body)
      .subscribe( 
        (res: any) => {
          console.log(res);
          alert('Created Successfully!')
        },
        (err: any) => {
          alert(err.message);
        }
      )
  }

}
