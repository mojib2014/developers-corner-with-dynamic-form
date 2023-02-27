import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormInputBase } from 'src/app/shared/components/dynamic-form/model/form-input-base';
import { FormDropdown } from 'src/app/shared/components/dynamic-form/model/form-dropdown';
import { FormTextbox } from 'src/app/shared/components/dynamic-form/model/form-textbox';
import { displayAnswersEvent } from 'src/app/shared/models/questions.model';

import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { FormTextarea } from 'src/app/shared/components/dynamic-form/model/form-textarea';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  questionForm: FormInputBase<string | boolean>[] = [
    new FormTextbox({
      key: 'username',
      label: 'Username',
      type: 'text',
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
      required: true,
      placeholder: 'Java | JavaScript | Data Structures',
      icon: '🎯',
    }),
    new FormTextarea({
      key: 'question',
      label: 'Question',
      type: 'text',
      required: true,
      placeholder: 'Java data types',
      icon: '❓',
    }),
  ];
  displayAnswers: boolean = false;
  currentUserId: number = 0;
  @Output() displayAnswersEvent = new EventEmitter<displayAnswersEvent>();

  authSub!: Subscription;
  questionSub!: Subscription;

  constructor(
    private auth: AuthService,
    private questionService: QuestionsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.authSub = this.auth
      .getCurrentUser()
      .subscribe((data) => (this.currentUserId = data?.id));
  }

  dataEvent() {
    this.displayAnswers = true;

    const event = {
      displayAnswers: this.displayAnswers,
      tags: this.questionForm.find((q) => (q.key === 'tags' ? q.value : null))
        ?.value as string,
      question: this.questionForm.find((q) =>
        q.key === 'question' ? q.value : null
      )?.value as string,
    };
    this.displayAnswersEvent.emit(event);
  }

  onSubmit(form: FormGroup) {
    const value = form.value;
    value.userId = this.currentUserId;
    this.questionSub = this.questionService.create(value).subscribe({
      next: (data) => console.log('saving a question:', data),
      error: (err) =>
        this.notificationService.error('Error saving question', err),
    });

    this.dataEvent();
  }

  ngOnDestroy(): void {
    console.log('destroying question-form-component');
    this.authSub.unsubscribe();
    if (this.questionSub) this.questionSub.unsubscribe();
  }
}
