import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

var http:HttpClient;


export interface ApiResponse
{
	CODE: number,
	MESSAGE: string,
	DATA: any,
	TOTAL_REGISTROS?: number
}


export default class Util {

	// Angular forms

	static controlNoValido(forma: FormGroup, controlName: string): boolean {
		const control = forma.get(controlName);
		return control!.invalid && control!.touched;
	}

	static messageErrors(form: FormGroup, controlName: string): string {
		const control = form?.get(controlName);
		let message = "";
		if (control?.errors){
			message = Object.values(control?.errors!).join(",");
		}
		return message;
	}
	
	static touchAllFormControls(grupo: FormGroup) {
		Object.values( grupo.controls ).forEach( control => {
		  if (control instanceof FormGroup) {
			this.touchAllFormControls(control);
		  } else {
			control.markAsTouched();
		  }
		});
	}

}