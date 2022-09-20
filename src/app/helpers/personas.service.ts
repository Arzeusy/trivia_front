/* * * *
 * Manejo de seguridad para comunicación con back-end
 * 20200507
 * crdeleon
 * 
 * Listado de variables en localStorage:
 * 	userName: Nombre del usuario logueado al sistema
 * 	roles: Roles asignados al usuario logueado
 * 	expiraEn: Fecha / hora en que la sesión expira
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiResponse } from '../ric/helpers/util';

import { environment } from 'src/environments/environment';
import Util from '../helpers/util';

@Injectable({
	providedIn: 'root'
})
export class PersonsService {
	private url = `${environment.apiUrl}/Home`;
	private userName: string | null = '';
	private roles: string[] | null | undefined = [];
	private expiraEn: Date | null = new Date();
	public AUTHCOOKIE = ".RICFORMSAUTH"
	constructor(private http: HttpClient) {
	}

	// -----------------------------------------------
	// metodos
	//-----------------------------------------------


	lstPersonas(  esquema:number, page:number, pageSize:number, NOMBRE:string, NO_IDENTIFIACION: string, TIPO_IDENTIFICACION:number, NSO:number, TPERSONA:number = 0): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/LisadoPersonas?esquema=${esquema}&page=${page}&pageSize=${pageSize}`, 
			{ NOMBRE, NO_IDENTIFIACION, TIPO_IDENTIFICACION, NSO, TPERSONA  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}


	lstTPersonas(  esquema:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/LisadoTipoPersonas?esquema=${esquema}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	lstTIdentificacion(  esquema:number, tipoPersona:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/listarTipoIdentificacion?esquema=${esquema}&tipoPersona=${tipoPersona}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	guardarPersonaNatural(esquema:number, tpersonas:number, bodyRaw:any): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/GuardarPersona?esquema=${esquema}&tipoPersona=${tpersonas}`, 
			{ ...bodyRaw }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	guardarPersonaJuridica(esquema:number, tpersonas:number, bodyRaw:any): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/GuardarPersona?esquema=${esquema}&tipoPersona=${tpersonas}`, 
			{ ...bodyRaw }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}


	ValidaDocumentoIdentificacion(esquema:number, idPersona:number, noDocumento:string, tDocumento:number, idDocumentoIdentificacion:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/ValidaDocumentoIdentificacion?idPersona=${idPersona}&esquema=${esquema}&noDocumento=${noDocumento}&tDocumento=${tDocumento}&idDocumentoIdentificacion=${idDocumentoIdentificacion}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	obtPersona(  esquema:number, idPersona:number, idTipoPersona:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/obtenerInfoPersona?esquema=${esquema}&idPersona=${idPersona}&idTipoPersona=${idTipoPersona}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	lstTDireccion(  esquema:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/listarTipoDireccion?esquema=${esquema}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}


	lstTTelefono(  esquema:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/listarTipoTelefono?esquema=${esquema}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}
	
	
	obtIdentificacion(  esquema:number, idPersona:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/obtenerInfoIdentificaciones?esquema=${esquema}&idPersona=${idPersona}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	obtDirecciones(  esquema:number, idPersona:number, page:number, pageSize:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/obtenerInfoDireccion?esquema=${esquema}&idPersona=${idPersona}&page=${page}&pageSize=${pageSize}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	
	obtTelefonos(  esquema:number, idPersona:number, page:number, pageSize:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/obtenerInfoTelefonos?esquema=${esquema}&idPersona=${idPersona}&page=${page}&pageSize=${pageSize}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	lstPais(  esquema:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/listarPaises?esquema=${esquema}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	lstDepartamento(  esquema:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/listarDepartamentos?esquema=${esquema}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}


	lstMunicipio(  esquema:number, idDepartamento:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/listarMunicipios?esquema=${esquema}&idDepartamento=${idDepartamento}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	guardarDireccion(esquema:number, bodyRaw:any): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/GuardarDireccion?esquema=${esquema}`, 
			{ ...bodyRaw }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}
	guardarTelefono(esquema:number, bodyRaw:any): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/GuardarTelefono?esquema=${esquema}`, 
			{ ...bodyRaw }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}
	
	lstProfesion(  esquema:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/listarProfesion?esquema=${esquema}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	transferirInformacionPersona(esquema:number, idpersona:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/trasferirInformacionPersona?esquema=${esquema}&idpersona=${idpersona}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}



	lstPersonaCoincidencia(  esquema:number, idpersona:number, documentos:string| null): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/LisadoPersonasCoincidencia?esquema=${esquema}&idpersona=${idpersona}`, 
			{ documentos }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}


	
	VolcadoInformacionPersona( esquemaD:number, esquemaO:number,  idPersonaD:number, idPersonaO:number, idTPersona:number, origenDatos:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/volcadoInformacionPersona?esquemaD=${esquemaD}&esquemaO=${esquemaO}&idPersonaD=${idPersonaD}&idPersonaO=${idPersonaO}&idTPersona=${idTPersona}&origenDatos=${origenDatos}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	lstBitacoraCamibos(  esquema:number, idpersona:number): Observable<ApiResponse> {
		const apiData = this.http.post(
			`${this.url}/obtenerBitacoraCambios?esquema=${esquema}&idpersona=${idpersona}`, 
			{  }
		).pipe(
			map((resp:any) => {
				return Util.makeSafeData(resp)})
		);
		return apiData;
	}

	// -----------------------------------------------
	// metodos
	//-----------------------------------------------
}
