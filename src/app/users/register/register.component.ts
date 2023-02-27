import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormInputBase } from 'src/app/shared/components/dynamic-form/model/form-input-base';
import { FormTextbox } from 'src/app/shared/components/dynamic-form/model/form-textbox';

import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormInputBase<string | boolean>[] = [
    new FormTextbox({
      key: 'firstName',
      label: 'First Name',
      type: 'firstName',
      required: true,
      placeholder: 'John',
      minlength: 3,
      icon: '🧔',
    }),
    new FormTextbox({
      key: 'lastName',
      label: 'Last Name',
      type: 'lastName',
      required: true,
      placeholder: 'Doe',
      minlength: 3,
      icon: '🧔',
    }),
    new FormTextbox({
      key: 'nickName',
      label: 'Nick Name',
      type: 'nickName',
      placeholder: 'Johny',
      icon: '🧔',
    }),
    new FormTextbox({
      key: 'type',
      label: 'Type',
      type: 'type',
      required: true,
      placeholder: 'Student or Mentor',
      icon: '🦕',
    }),
    new FormTextbox({
      key: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'john.doe@domain.com',
      icon: '📨',
    }),
    new FormTextbox({
      key: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      placeholder: '@p21%gm',
      minlength: 6,
      icon: '🔐',
    }),
  ];

  sub!: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    this.sub = this.auth.register(form.value).subscribe({
      next: (data) => {
        console.log('registering a user:', data);
        this.router.navigate(['home']);
      },
      error: (err) =>
        this.notifService.error('Error registering a user', err()),
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
