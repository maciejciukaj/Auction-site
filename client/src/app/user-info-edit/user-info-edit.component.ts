import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.scss'],
})
export class UserInfoEditComponent implements OnInit {
  @Output() cancelEdit = new EventEmitter();
  constructor(
    private toastr: ToastrService,
    private http: HttpClientModule,
    private accountService: AccountService,
    private router: Router
  ) {}
  model: any = {};
  name: any;
  ngOnInit(): void {}

  cancel() {
    this.cancelEdit.emit(false);
  }

  editUserInfo() {
    this.accountService.currentUser$.subscribe((val) => (this.name = val));
    this.model.username = this.name.userName;
    console.log(this.model);
    this.accountService.editUserInfo(this.model).subscribe(
      (response) => {
        console.log('edited');
        window.location.reload();
      },
      (error) => {
        console.log(error.error);

        this.toastr.error(error.error);
      }
    );
  }
}
