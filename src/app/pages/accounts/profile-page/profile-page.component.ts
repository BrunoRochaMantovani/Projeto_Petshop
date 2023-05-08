import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: DataService) {
    this.form = this.fb.group({
      nam: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required
      ])],
      document: [{ value: '', disabled: true }],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required
      ])],
    })
  }
  ngOnInit() {
    this.busy = true;
    this
      .service
      .getProfile()
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.form.controls['name'].setValue(data.name);
          this.form.controls['document'].setValue(data.document);
          this.form.controls['email'].setValue(data.email);
        },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      )
  }
}
