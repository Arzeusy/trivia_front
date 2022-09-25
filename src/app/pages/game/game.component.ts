import { Component, OnInit } from '@angular/core';

import { TriviaService } from 'src/app/services/trivia.service'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import Util from './../../helpers/util';
import { NgxSpinnerService } from 'ngx-spinner';
import { AnimationOptions, BMCompleteEvent, BMCompleteLoopEvent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Router } from '@angular/router';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';


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
  
  seeAnimation: boolean = false;
  pathAnimCount =  "/assets/animations/123go.json";
  pathAnimCorrect =  "/assets/animations/mortyDance.json";
  pathAnimIncorrect =  "/assets/animations/morty.json";
  options: AnimationOptions = {    
    path: this.pathAnimCorrect,
    
  };  

  lstQuestions: Array<any> = [];
  lstQuestionsSelected: Array<any> = [];
  questionAnswered: Array<any> = [];
  actualQuestion = new FormControl('');
  actualQuest: any = {};
  numberQuestion = 0;

  lstanswers : Array<any> = [];
  preguntaTerminada = false;
  constructor(
    private formBuilder: FormBuilder,
    private triviaService: TriviaService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private _snackBar: MatSnackBar
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
      this.initQuestions();
    } else {
      this.utilR.touchAllFormControls(this.frmQ)
    }
    
  }

  async obtenerPreguntas(){}

   onAnimate(animationItem: AnimationItem): void {    
    // console.log(animationItem);
    // this.form.disable();
  }
  
  loopComplete(animationItem: BMCompleteEvent) {
    // console.log(animationItem);
  }

  async initQuestions() {
    this.spinner.show();
    let episodios = this.frmQ.value.episodes;
    episodios = episodios.map( (x:string) => { 
      return parseInt(x, 10); 
    });
    let res = await this.triviaService.getQuestions(episodios);
    this.lstQuestions = res.data;
    if (this.lstQuestions.length == 0) {
      this._snackBar.open('No se encontraron preguntas disponibles, selecciona otro episodio por favor', 'Cerrar', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
      });
      this.spinner.hide();

      this.route.navigate(['/']);
    }
    do {
      const randomNumber = Math.floor(Math.random() * this.lstQuestions.length);
    
      if (!this.lstQuestionsSelected.includes(this.lstQuestions[randomNumber])) {
          this.lstQuestionsSelected.push(this.lstQuestions[randomNumber]);
      }
    
    } while (this.lstQuestionsSelected.length < ( this.lstQuestions.length > 10 ? 10 : this.lstQuestions.length ));
    
    let resa = await this.triviaService.getAnswers(this.lstQuestionsSelected[0]._id);
    this.lstanswers = resa.data;
    this.actualQuestion.setValue(this.lstQuestionsSelected[0].question);
    this.actualQuest = this.lstQuestionsSelected[0];
    this.actualQuestion.disable();
    this.spinner.hide();
  }

  paletteColour(item: any) {
    if (item.isCorrect) { return 'accent'; }
    else { return 'warn'; }
  };

  validAnswer(item: any) {
    if (item.isCorrect) {
      this.options = { path: this.pathAnimCorrect, };
      this.questionAnswered.push({points: this.actualQuest.points, id:this.actualQuest._id })
    } else {
      this.options = { path: this.pathAnimIncorrect, };
    }
    this.seeAnimation = true;
    this.preguntaTerminada = !this.preguntaTerminada;
  }
  get pointsTotal() {
    let suma = 0;
    this.questionAnswered.forEach((element: any) => { suma += element.points })
    return suma
  };

  async nextQuestion() {
    this.spinner.show();
    this.seeAnimation = false;
    this.preguntaTerminada = !this.preguntaTerminada;
    this.numberQuestion = ++this.numberQuestion;
    console.log(this.lstQuestionsSelected)
    console.log(this.numberQuestion)
    let resa = await this.triviaService.getAnswers(this.lstQuestionsSelected[this.numberQuestion]._id);
    this.lstanswers = resa.data;
    this.actualQuestion.setValue(this.lstQuestionsSelected[this.numberQuestion].question);
    this.actualQuest = this.lstQuestionsSelected[this.numberQuestion];
    this.spinner.hide();

  }

  async savePoints() {
    this.spinner.show();
    // console.log(this.pointsTotal)
    let res = await this.triviaService.savePoints(this.pointsTotal);
    if (res.data == true )this.route.navigate(['/rank']);

    this.spinner.hide();
  }


}
