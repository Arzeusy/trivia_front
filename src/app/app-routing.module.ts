import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { RankComponent } from './pages/rank/rank.component';
import { TriviaComponent } from './pages/trivia/trivia.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "quiz", component: TriviaComponent },
  { path: "quiz/:id", component: TriviaComponent },
  { path: "rank", component: RankComponent },
  { path: "game", component: GameComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
