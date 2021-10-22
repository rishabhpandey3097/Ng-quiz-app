import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent, pathMatch: 'full' },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
