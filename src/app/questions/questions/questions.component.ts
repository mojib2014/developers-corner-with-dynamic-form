import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/shared/models/questions.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { QuestionsService } from 'src/app/shared/services/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];

  sub!: Subscription;
  authSub!: Subscription;

  constructor(
    private questionsService: QuestionsService,
    private auth: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.authSub = this.auth.getCurrentUser().subscribe((data) => {
      this.sub = this.questionsService.getQuestionByUserId(data.id).subscribe({
        next: (data) => (this.questions = data),
        error: (err) =>
          this.notificationService.error('Something went wrong ', err),
      });
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
