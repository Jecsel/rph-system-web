import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiServiceService } from 'app/services/api-service.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss']
})
export class TypographyComponent implements OnInit {
  editField: string;
  all_users: Array<any> = [];
  default_data: any = {username: '', password: '', user_type_id: 1, user_role_id: 1};
  body_data: any = {username: '', password: '', user_type_id: 1, user_role_id: 1};

  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder) { }
  user_data: any;
  select_user_data: any;

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.apiService
      .getAllUsers()
      .subscribe( 
        (res: any) => {
          console.log(res);
          this.all_users = res.user;
        },
        (err: any) => {
          alert(err.error);
        }
      )
  }

  registerUser(): void {
    this.apiService
      .registerUser({user: this.body_data })
      .subscribe( 
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          alert(err.message);
        }
      )
  }

  updateUser(data): void {
    this.apiService
      .updateUser({user: data})
      .subscribe( 
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          alert(err.message);
        }
      )
  }

  deleteUser(id): void {
    this.apiService
    .deleteUser({id: id})
    .subscribe( 
      (res: any) => {
        this.getAllUsers();
      },
      (err: any) => {
        alert(err.message);
      }
    )
  }

  updateList(id: number, property: string, event: any, selected_user: any) {
    const editField = event.target.textContent;
    // this.all_users[id][property] = editField;
    console.log("data body: ",this.body_data);
    console.log("id : ", id);

    if(id == undefined){
      this.body_data[property] = editField;
      var u = this.body_data.username;
      var p = this.body_data.password;
      var t = this.body_data.user_type_id;
      var r = this.body_data.user_role_id;
      console.log(p);
      if(u != "" && p != ""){
        console.log("body", this.body_data);
        this.registerUser();
        this.default_data = {username: '', password: '', user_type_id: 1, user_role_id: 1};
        this.body_data = {username: '', password: '', user_type_id: 1, user_role_id: 1};
      }
    }
  
    if(id > 0){
      
      selected_user[property] = editField;
      if(selected_user.username != "" && selected_user.password != ""){
        console.log("log", selected_user);
        this.updateUser(selected_user);
        this.default_data = {username: '', password: '', user_type_id: 1, user_role_id: 1};
        this.body_data = {username: '', password: '', user_type_id: 1, user_role_id: 1};
      }
    }

  }

  remove(id: any) {
    this.deleteUser(id);
    // this.awaitingPersonList.push(this.personList[id]);
    // this.all_users.splice(id, 1);
  }

  add() {
    // if (this.awaitingPersonList.length > 0) {
      this.all_users.push(this.default_data);
      // const person = this.awaitingPersonList[0];
      // this.personList.push(person);
      // this.awaitingPersonList.splice(0, 1);
    // }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
