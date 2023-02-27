import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormDropdown } from 'src/app/shared/components/dynamic-form/model/form-dropdown';
import { FormInputBase } from 'src/app/shared/components/dynamic-form/model/form-input-base';
import { FormTextarea } from 'src/app/shared/components/dynamic-form/model/form-textarea';
import { FormTextbox } from 'src/app/shared/components/dynamic-form/model/form-textbox';
import { GlobalModalComponent } from 'src/app/shared/components/global-modal/global-modal.component';
import { ModalConfig } from 'src/app/shared/components/global-modal/modal.config';
import { Question } from 'src/app/shared/models/questions.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { QuestionsService } from 'src/app/shared/services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() questions: Question[] = [];

  questionToUpdate!: Question;

  updateForm: FormInputBase<string | boolean>[] = [];

  sub!: Subscription;

  @ViewChild('modal') private modal!: GlobalModalComponent;
  modalConfig: ModalConfig = {
    modalTitle: 'Question Update',
    onDismiss: () => true,
    dismissButtonLabel: 'Dismiss',
    onClose: () => true,
    closeButtonLabel: 'Close',
  };

  constructor(
    private questionService: QuestionsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  async openModal(question: Question) {
    this.questionToUpdate = question;

    this.createForm();
    return await this.modal.open();
  }

  onSubmit(form: FormGroup) {
    const value = form.value;
    value.userId = this.questionToUpdate.user.id;
    value.id = this.questionToUpdate.id;

    this.sub = this.questionService.update(value).subscribe({
      next: () => this.modal.close(),
      error: (err) =>
        this.notificationService.error('Something went wrong ', err),
    });
  }

  onRemove(id?: number) {
    this.questions = this.questions.filter((q) => q.id != id);
    this.sub = this.questionService.delete(id).subscribe({
      next: (data) => console.log('Deleting a question', data),
      error: (err) =>
        this.notificationService.error('Something went wrong ', err),
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  createForm() {
    this.updateForm = [
      new FormTextbox({
        key: 'username',
        label: 'Username',
        type: 'text',
        value: this.questionToUpdate?.username,
        required: true,
        placeholder: 'john.doe',
        minlength: 3,
        icon: '🧔',
      }),
      new FormDropdown({
        key: 'role',
        label: 'Role',
        options: [
          { key: 'student', value: 'Student' },
          { key: 'mentor', value: 'Mentor' },
        ],
        required: true,
        icon: '💼',
      }),
      new FormTextbox({
        key: 'tags',
        label: 'Tags',
        type: 'text',
        value: this.questionToUpdate?.tags,
        required: true,
        placeholder: 'Java | JavaScript | Data Structures',
        icon: '🎯',
      }),
      new FormTextarea({
        key: 'question',
        label: 'Question',
        type: 'text',
        value: this.questionToUpdate?.question,
        required: true,
        placeholder: 'Java data types',
        icon: '❓',
      }),
    ];
  }
}
