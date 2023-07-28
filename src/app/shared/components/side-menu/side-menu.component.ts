import { Component } from '@angular/core';

interface itemMenu{
  title:string;
  route:string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [
  ]
})
export class SideMenuComponent {

  public reactiveMenu: itemMenu[] = [
    //el route acá es relativo, ¿por qué? va un ./ atrás porque el menú va de la página principal, un paso atrás a donde están auth y reactive y luego a basic?
    {title: 'Básicos', route: '/reactive/basic'},
    {title: 'Dynamic', route: '/reactive/dynamic'},
    {title: 'Switch', route: '/reactive/switch'}
  ]

  public authMenu: itemMenu[] = [
    {title: 'Registrarse', route: '/auth/register'}
  ]
}
