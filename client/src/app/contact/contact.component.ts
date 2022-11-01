import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../_services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  emailDetails: any = {};
  email = new FormGroup({
    subject: new FormControl(null, [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.minLength(4),
      Validators.maxLength(35),
    ]),
    body: new FormControl(null, [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(100),
    ]),
  });
  constructor(
    private emailService: EmailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  sendEmail() {
    this.emailDetails.to = 'carclubservice55@gmail.com';
    this.emailDetails.subject =
      this.email.get('subject').value + ' --- Question';
    this.emailDetails.body = this.email.get('body').value;
    this.emailService.sendEmail(this.emailDetails).subscribe((response) => {
      this.toastr.success('Success, we will write back as soon as possible.');
      this.emailDetails = {};
      this.email.reset();
    });
  }
  showData() {
    console.log(this.email.value);
  }
  get f() {
    return this.email.controls;
  }
}
