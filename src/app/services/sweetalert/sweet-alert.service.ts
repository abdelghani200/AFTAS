import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }


  showAlert(title: string, message: string, icon: SweetAlertIcon = 'success'){
    return Swal.fire(title, message, icon);
  }

}
