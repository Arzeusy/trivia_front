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
export class AuthService {
	private url = `${environment.apiUrl}/user`;
	private userName: string | null = '';
	private roles: string[] | null | undefined = [];
	private expiraEn: Date | null = new Date();
  public AUTHCOOKIE = "jwt"
  
  constructor(
	  private http: HttpClient,
  ) { }
    
	saveInfo(value: string, key: string) {
		localStorage.setItem(key, value);
	}

	get localInfo(){
		return localStorage.getItem("jwt") ;
	}

	get localuser(){
		return localStorage.getItem("nickname") ;
	}


	// -----------------------------------------------
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
				this.saveInfo(res.data, "jwt")
				return true;
			})
        .catch((err:any) => { console.log ('error'); return false});
			
		return apiData;
	}


	infoUser(): Promise<any>  {
		let apiData = this.http.get(
			`${this.url}/${this.localInfo}`,
			{  }
		)
		.toPromise()
			.then((res: any) => {
				this.saveInfo(res.data.nickname, "nickname")
				return res;
			})
        .catch((err:any) => { console.log ('error'); });
			
		return apiData;
	}


	signup(  data:any ): Promise<any>  {
		let apiData = this.http.post(
			`${this.url}/signup`,
			{ ...data }
		)
		.toPromise()
			.then((res:any) => {
				console.log(res);
				this.saveInfo(res.data._id, "jwt")
				this.saveInfo(res.data.nickname, "nickname")
				return true;
			})
        .catch((err:any) => { console.log ('error'); return false});
			
		return apiData;
	}

	logout() {
		localStorage.removeItem("jwt");
		localStorage.removeItem("nickname");
	}


}
