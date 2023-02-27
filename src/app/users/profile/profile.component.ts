import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormDropdown } from 'src/app/shared/components/dynamic-form/model/form-dropdown';

import { FormInputBase } from 'src/app/shared/components/dynamic-form/model/form-input-base';
import { FormTextbox } from 'src/app/shared/components/dynamic-form/model/form-textbox';
import { GlobalModalComponent } from 'src/app/shared/components/global-modal/global-modal.component';
import { ModalConfig } from 'src/app/shared/components/global-modal/modal.config';
import { User } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  userSub!: Subscription;
  authSub!: Subscription;
  profileForm: FormInputBase<string>[] = [];

  @ViewChild('modal') private modal!: GlobalModalComponent;
  modalConfig: ModalConfig = {
    modalTitle: 'Profile Update',
    onDismiss: () => true,
    dismissButtonLabel: 'Dismiss',
    onClose: () => true,
    closeButtonLabel: 'Close',
  };

  constructor(
    private userService: UsersService,
    private auth: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authSub = this.auth.getCurrentUser().subscribe({
      next: (data) => (this.user = data),
      error: (err) =>
        this.notificationService.error('Error getting current user', err),
    });
    this.createForm();
  }

  async openModal() {
    this.user.password = '';

    return await this.modal.open();
  }

  onSubmit(form: FormGroup) {
    this.userSub = this.userService.update(this.user.id, form.value).subscribe({
      next: (data) => console.log('deleting a user:', data),
      error: (err) =>
        this.notificationService.error('Error updating a user', err),
    });
  }

  onRemove(id: number) {
    this.userSub = this.userService.delete(id).subscribe({
      next: (data) => console.log('deleting a user:', data),
      error: (err) =>
        this.notificationService.error('Error deleting a user', err()),
    });
    this.auth.logout().subscribe(() => console.log('Logged out success'));
    this.router.navigate(['register']);
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
    this.authSub.unsubscribe();
  }

  private createForm() {
    this.profileForm = [
      new FormTextbox({
        key: 'firstName',
        label: 'First Name',
        type: 'firstName',
        value: this.user?.firstName,
        required: true,
        placeholder: 'John',
        icon: '🧔',
        minlength: 3,
      }),
      new FormTextbox({
        key: 'lastName',
        label: 'Last Name',
        type: 'lastName',
        value: this.user?.lastName,
        required: true,
        placeholder: 'Doe',
        icon: '🧔',
        minlength: 3,
      }),
      new FormTextbox({
        key: 'nickName',
        label: 'Nick Name',
        type: 'nickName',
        value: this.user?.nickName,
        placeholder: 'Johny',
        icon: '🧔',
      }),
      new FormDropdown({
        key: 'type',
        label: 'Role',
        type: 'text',
        options: [
          { key: 'student', value: 'Student' },
          { key: 'mentor', value: 'Mentor' },
        ],
        value: this.user?.type,
        required: true,
        placeholder: 'Student or Mentor',
        icon: '🦕',
      }),
      new FormTextbox({
        key: 'email',
        label: 'Email',
        type: 'email',
        value: this.user?.email,
        required: true,
        placeholder: 'john.doe@domain.com',
        icon: '📨',
      }),
      new FormTextbox({
        key: 'password',
        label: 'Password',
        type: 'password',
        value: this.user?.password,
        required: true,
        minlength: 6,
        placeholder: '@p21%gm',
        icon: '🔐',
      }),
    ];
  }
}
