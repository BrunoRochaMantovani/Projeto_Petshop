import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Security } from 'src/app/utils/security.util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;
  constructor(
    private service: DataService,
    private fb: FormBuilder,
    private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    
    const token = Security.getToken();
    if (token) {
      this.busy = true;
      this
        .service
        .refreshToken()
        .subscribe(
          (data: any) => {
            this.busy = false;
            this.setUser(data.customer, data.token);
          },
          (err) => {
            localStorage.clear();
            this.busy = false
          }
        )
    }
  }

  submit() {
    // Local Storage
    this.busy = true;
    this.service.authenticate(this.form.value)
      .subscribe((data: any) => {
        this.busy = false;
        this.setUser(data.customer, data.token);
      },
        (err) => {
          console.log(err)
          this.busy = false;
        });
  }
  setUser(user: any,token: any){
    Security.set(user,token);
    this.router.navigate(['/']);
  }
}
