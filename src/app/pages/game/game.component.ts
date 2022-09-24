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
  

  constructor(
    private formBuilder: FormBuilder,
    private triviaService: TriviaService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.createFrm()
  }

  

  createFrm() {
    this.frmQ = this.formBuilder.group({
      episode: [null, [ Validators.required]],
      question: ['', [Validators.required, Validators.minLength(4)]],
      points: [0, [Validators.required, Validators.min(1)]],
      answers: this.formBuilder.array([], [Validators.minLength(3)]),
    });
  }




}
