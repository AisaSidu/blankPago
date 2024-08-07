import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() {}

  getMenuItems() {
    return [
      { icon: '<i class="fa fa-pencil-ruler"></i>', name: 'Logotipo'},
      { icon: '<i class="fa fa-bullhorn"></i>', name: 'Branding'},
      { icon: '<i class="fa fa-desktop"></i>', name: 'Diseño Web'},
      { icon: '<i class="fa fa-box"></i>', name: 'Empaque'},
      { icon: '<i class="fa fa-ad"></i>', name: 'Publicidad'},
      { icon: '<i class="fa fa-mobile-alt"></i>', name: 'Redes Sociales'},
      { icon: '<i class="fa fa-chart-line"></i>', name: 'Estrategia'},
      { icon: '<i class="fa fa-newspaper"></i>', name: 'Editorial'}
    ];
  }
}