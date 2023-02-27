import { User } from './users.model';

export interface Question {
  id: number;
  username: string;
  role: string;
  tags: string;
  question: string;
  user: User;
}

export interface QuestionForm {
  id?: number;
  username: string;
  role: string;
  tags: string;
  question: string;
  userId: number;
}

export type displayAnswersEvent = {
  displayAnswers: boolean;
  tags: string;
  question: string;
};

export type MDNAnswers = {
  is_answered: boolean;
  link: string;
  tags: [string];
  title: string;
  view_count: number;
};
