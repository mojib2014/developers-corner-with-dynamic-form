import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { FormInputBase } from 'src/app/shared/components/dynamic-form/model/form-input-base';
import { FormTextbox } from 'src/app/shared/components/dynamic-form/model/form-textbox';
import { GlobalModalComponent } from 'src/app/shared/components/global-modal/global-modal.component';
import { ModalConfig } from 'src/app/shared/components/global-modal/modal.config';
import { ChatMessage } from 'src/app/shared/models/chat-message.model';
import { MDNAnswers } from 'src/app/shared/models/questions.model';
import { User } from 'src/app/shared/models/users.model';
import { ChatMessageService } from 'src/app/shared/services/chat-message.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { QuestionsService } from 'src/app/shared/services/questions.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayAnswers: boolean = false;
  answers: MDNAnswers[] = [];
  users: User[] = [];
  sub!: Subscription;
  messages: ChatMessage[] = [];

  chatForm: FormInputBase<string>[] = [
    new FormTextbox({
      key: 'message',
      label: 'Message',
      type: 'text',
      required: true,
      placeholder: 'Hi John!, Can you help me with...',
      minlength: 3,
      icon: '✉',
    }),
  ];

  @ViewChild('modal') private modal!: GlobalModalComponent;
  modalConfig: ModalConfig = {
    modalTitle: 'Chat Form',
    onDismiss: () => true,
    dismissButtonLabel: 'Dismiss',
    onClose: () => true,
    closeButtonLabel: 'Close',
  };

  constructor(
    private questionService: QuestionsService,
    private notificationService: NotificationService,
    private userService: UsersService,
    private chatService: ChatMessageService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data: any) => (this.users = data));
    this.chatService
      .receive()
      .subscribe((data: any) => console.log('message finally received:', data));
  }

  onSubmit(value: { displayAnswers: boolean; tags: string; question: string }) {
    this.displayAnswers = value.displayAnswers;

    this.fetchAnswersFromMdnAndStackoverflow(value.tags, value.question);
  }

  newQuestion() {
    this.displayAnswers = false;
  }

  fetchAnswersFromMdnAndStackoverflow(tags: string, question: string) {
    this.sub = this.questionService
      .fetchResourceFromStackOverFlow(tags, question)
      .subscribe({
        next: ({ items }: any) => (this.answers = items),
        error: (err: any) =>
          this.notificationService.error('Something went wrong ', err),
      });
  }

  ngOnDestroy(): void {
    console.log('Destroying home component');

    if (this.sub) this.sub.unsubscribe();
  }

  async openModal() {
    this.chatService.initialize();
    return await this.modal.open();
  }

  onChatSubmit(form: FormGroup) {
    console.log('char from', form.value);
    this.chatService.send(form.value);
  }
}
