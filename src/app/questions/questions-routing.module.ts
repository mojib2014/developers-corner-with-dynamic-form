import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingTitles } from "../app-routing.titles";
import { AuthGuard } from "../shared/guards/auth.guard";
import { QuestionsComponent } from "./questions/questions.component";

const routes: Routes = [
  {
    path: "",
    component: QuestionsComponent,
    canActivate: [AuthGuard],
    data: {
      title: AppRoutingTitles.QUESTIONS,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
