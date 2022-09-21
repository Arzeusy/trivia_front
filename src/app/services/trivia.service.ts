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
	private url = `${environment.apiUrl}/user`;
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

	signin(  email:string, password:string ): Promise<any>  {
		let apiData = this.http.post(
			`${this.url}/signin`,
			{ email, password }
		)
		.toPromise()
			.then((res:any) => {
				console.log(res);
				return true;
			})
        .catch((err:any) => { console.log ('error'); return false});
			
		return apiData;
	}



}
