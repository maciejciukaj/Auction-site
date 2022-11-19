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
  sendingMessage: string = 'Send us a message !';
  email = new FormGroup({
    subject: new FormControl(null, [
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      Validators.minLength(4),
      Validators.maxLength(35),
    ]),
    body: new FormControl(null, [
      Validators.required,
      Validators.minLength(15),
      Validators.maxLength(500),
    ]),
  });
  constructor(
    private emailService: EmailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  sendEmail() {
    if (this.validation()) {
      this.sendingMessage = 'Sending ...';
      this.emailDetails.to = 'carclubservice55@gmail.com';
      this.emailDetails.subject =
        this.email.get('subject').value + ' --- Question';
      this.emailDetails.body = this.email.get('body').value;
      this.emailService.sendEmail(this.emailDetails).subscribe(
        (response) => {
          this.toastr.success(
            'Success, we will write back as soon as possible.'
          );
          this.emailDetails = {};
          this.email.reset();
          this.sendingMessage = 'Send us a message !';
        },
        (error) => {
          this.sendingMessage = 'Error! Try again';
        }
      );
    }
  }
  showData() {
    console.log(this.email.value);
    console.log(this.email.valid);
  }
  validation() {
    if (!this.email.get('subject').valid) {
      this.toastr.error('Wrong email');
      return false;
    } else if (!this.email.get('body').valid) {
      this.toastr.error('Wrong message, 15-500 characters');
      return false;
    } else {
      return true;
    }
  }
  get f() {
    return this.email.controls;
  }
}
