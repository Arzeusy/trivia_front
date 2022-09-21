import { Component, OnInit } from '@angular/core';

import { TriviaService } from 'src/app/services/trivia.service'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import Util from './../../helpers/util';
 

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.sass']
})
export class TriviaComponent implements OnInit {

  utilR = Util;

  frmQ!: FormGroup;
  frmA!: FormGroup;
  
  lstEpisode: Array<any> = [];
  infoEpisode: any = {};
  lstNumberEpisode: any;
  episodeName: string= "";
  episodeCode: string = "";
  
  displayedColumns = ['NO', 'RESPUESTA', 'CORRECTO', 'OPTIONS'];


  constructor(
        private formBuilder: FormBuilder,
      private triviaService: TriviaService,
  ) {
    this.createFrm();
    [1,2,3].forEach(element => {
      this.createFrmA();
       (this.frmQ.get("answers") as FormArray).push(this.frmA);
    });
  }

  ngOnInit(): void {
    this.getEpisodes();
  }


  createFrm() {
    this.frmQ = this.formBuilder.group({
      episode: [null, [ Validators.required]],
      question: ['', [Validators.required, Validators.minLength(4)]],
      points: [0, [Validators.required, Validators.min(1)]],
      answers: this.formBuilder.array([], [Validators.minLength(3)]),
    });
  }

   createFrmA() {
    this.frmA = this.formBuilder.group({
      answer: [null, [ Validators.required]],
      isCorrect: [ '0', [Validators.required]],
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


  get lstAnswer() {
    return this.frmQ.controls["answers"] as FormArray;
  }

  async onSubmit() {
    console.log(this.frmQ.value);
    if (this.frmQ.invalid) {
      this.utilR.touchAllFormControls(this.frmQ);
    } else {
      let resp = await this.triviaService.newQuestion(this.frmQ.value);
      console.log(resp);
      // this.createFrm();
    }
  }




}
