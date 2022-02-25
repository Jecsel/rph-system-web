import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'app/services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  data: any;
  error_message: any;

  constructor( private router: Router, private apiService: ApiServiceService ) {

    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('has_profile', '');
    localStorage.setItem('user_id', '');
    localStorage.setItem('user_profile_id', '');
    localStorage.setItem('user_building_id', '');
    this.data = {user: {} };
  }

  submitLogin(): void {
    this.data.user = this.form.value;
    this.apiService.signIn(this.data).subscribe( (res: any) => {
      // if(res.user.building_id == 1){
      //   this.router.navigate(['user-profile']);
      // }else{
      //   res.has_profile? this.router.navigate(['dashboard']) : this.router.navigate(['user-profile']);
      // }
      this.router.navigate(['dashboard'])
      alert(res.message);
    }, err => {
      this.error_message = err.error.message;
      console.log(err);
      alert(this.error_message);
    });
  }

}
