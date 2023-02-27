import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppRoutingTitles } from "./app-routing.titles";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    data: {
      title: AppRoutingTitles.HOME,
    },
  },
  {
    path: "questions",
    loadChildren: () =>
      import("./questions/questions.module").then((m) => m.QuestionsModule),
    data: {
      title: AppRoutingTitles.QUESTIONS,
    },
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./users/users.module").then((m) => m.UsersModule),
    data: {
      title: AppRoutingTitles.PROFILE,
    },
  },

  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
