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
  personList: Array<any> = [
    { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
    { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
    { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
    { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
    { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
  ];

  awaitingPersonList: Array<any> = [
    { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
    { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
    { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
    { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
    { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
  ];

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
      .registerUser(this.user_data)
      .subscribe( 
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          alert(err.error);
        }
      )
  }

  updateUser(): void {
    this.apiService
      .updateUser(this.select_user_data)
      .subscribe( 
        (res: any) => {
          console.log(res);
        },
        (err: any) => {
          alert(err.error);
        }
      )
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      this.all_users.push(this.default_data);
      // const person = this.awaitingPersonList[0];
      // this.personList.push(person);
      // this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
