import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TriviaService } from 'src/app/services/trivia.service';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.sass']
})
export class RankComponent implements OnInit {


  BestPlayers :Array<any> = []
  first:any = {}
  second:any = {}
  third: any = {}
  yourPosition = {}
  placeuser: number = 0;
  displayedColumns = ['NO', 'NICKNAME', 'POINTS'];

  constructor(
    private formBuilder: FormBuilder,
    private triviaService: TriviaService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getRanking();
  }


  async getRanking() {
    this.spinner.show();
    this.BestPlayers = (await this.authService.rank()).data;
    
    this.first = this.BestPlayers[0];
    this.second = this.BestPlayers[1];
    this.third = this.BestPlayers[2];
    this.yourPosition = this.BestPlayers.find((element: any) => element._id == this.authService.localInfo);
    this.placeuser = this.BestPlayers.indexOf(this.yourPosition);

    this.spinner.hide();
  }





}
