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
    this.data = {user: {} };
  }

  submitLogin(): void {
    this.data.user = this.form.value;
    this.apiService.signIn(this.data).subscribe( (res: any) => {
      res.has_profile? this.router.navigate(['dashboard']) : this.router.navigate(['user-profile']);
    }, err => {
      this.error_message = err.error;
      alert(this.error_message);
    });

  }

}
