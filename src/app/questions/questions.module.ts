import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { QuestionsRoutingModule } from "./questions-routing.module";
import { QuestionsComponent } from "./questions/questions.component";
import { QuestionComponent } from "./question/question.component";
import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [QuestionsComponent, QuestionComponent],
  imports: [
    SharedModule,
    QuestionsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
})
export class QuestionsModule {}
