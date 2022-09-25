import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TriviaComponent } from './pages/trivia/trivia.component';
import { GameComponent } from './pages/game/game.component';
import { RankComponent } from './pages/rank/rank.component';


import { NgxSpinnerModule } from "ngx-spinner";
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
//  material module imports 

import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    SigninComponent,
    SignupComponent,
    TriviaComponent,
    GameComponent,
    RankComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    LottieModule.forRoot({ player: playerFactory }),
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule, 
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDialogModule,
    MatBadgeModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
