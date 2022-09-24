import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse } from '../helpers/util';

import { environment } from 'src/environments/environment';
import Util from '../helpers/util';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
	private url = `${environment.apiUrl}/trivia`;
	private urlRM = `${environment.apiUrlRM}`;
	private userName: string | null = '';
	private roles: string[] | null | undefined = [];
	private expiraEn: Date | null = new Date();
  public AUTHCOOKIE = "jwt"
  
  constructor(
	  private http: HttpClient,
  ) { }

  //-----------------------------------------------
	// metodos
	//-----------------------------------------------

	episodeLst( num:string=""  ): Promise<any>  {
		let apiData = this.http.get(
			`${this.urlRM}/${num}`,
			{ }
		)
		.toPromise()
			.then((res:any) => {
        return res;
			})
      .catch((err:any) => { console.log ('error'); return false});
			
		return apiData;
	}

  newQuestion(data: any): Promise<any>  {
    data.id = localStorage.getItem("jwt");
		let apiData = this.http.post(
			`${this.url}/newQuestion`,
			{ data }
		)
		.toPromise()
			.then((res:any) => {
        return res;
			})
      .catch((err:any) => { console.log ('error'); return false});
			
		return apiData;
	}


	getQuestions(Episode:number[]): Promise<any>  {
    	let id = localStorage.getItem("jwt");
		let apiData = this.http.post(
			`${this.url}/onGame`,
			{ Episode }
		).toPromise()
		.then((res:any) => {
        		return res;
		})
      	.catch((err:any) => { console.log ('error'); return false});
			
		return apiData;
	}

	getAnswers(id:number): Promise<any>  {
    	// let id = localStorage.getItem("jwt");
		let apiData = this.http.get(
			`${this.url}/answers/${id}`,
			{  }
		).toPromise()
		.then((res:any) => {
        		return res;
		})
      	.catch((err:any) => { console.log ('error'); return false});
			
		return apiData;
	}

	savePoints(points:number): Promise<any>  {
    	let id = localStorage.getItem("jwt");
		let apiData = this.http.post(
			`${this.url}/savePoints/${id}`,
			{ points }
		).toPromise()
		.then((res:any) => {
        		return res;
		})
      	.catch((err:any) => { console.log ('error'); return false});
			
		return apiData;
	}


	


}
