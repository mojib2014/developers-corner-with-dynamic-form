import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingTitles } from "../app-routing.titles";
import { AuthGuard } from "../shared/guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: AppRoutingTitles.LOGIN,
    },
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: AppRoutingTitles.REGISTER,
    },
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      title: AppRoutingTitles.PROFILE,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
