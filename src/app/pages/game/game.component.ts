import { Component, OnInit } from '@angular/core';

import { TriviaService } from 'src/app/services/trivia.service'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import Util from './../../helpers/util';
import { NgxSpinnerService } from 'ngx-spinner';
 
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  utilR = Util;

  frmQ!: FormGroup;
  frmA!: FormGroup;
  
  lstEpisode: Array<any> = [];
  infoEpisode: any = {};
  lstNumberEpisode: any;
  episodeName: string= "";
  episodeCode: string = "";
  
  onGame: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private triviaService: TriviaService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.getEpisodes();
    this.createFrm()
  }

  

  createFrm() {
    this.frmQ = this.formBuilder.group({
      episodes: [null, [ Validators.required]],
    });
  }

  async getEpisodes() {
    let Episode = await this.triviaService.episodeLst();
    this.lstEpisode = Episode.results;
    this.infoEpisode = Episode.info;
    this.lstNumberEpisode = Array(this.infoEpisode.count).fill(1).map((x, i) => i + 1);
  }

    async changeSelectEpisode(dato:any){
    let Episode = await this.triviaService.episodeLst(dato.value);
    this.episodeName = Episode.name;
    this.episodeCode = Episode.episode;    
  }

  goGame() {
    if (this.frmQ.valid) {
      this.onGame = !this.onGame;
    } else {
      this.utilR.touchAllFormControls(this.frmQ)
    }
    
  }


}
