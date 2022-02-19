import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styleUrls: ['./base-component.component.scss']
})
export class BaseComponent {

  constructor() { }

  test() {
    console.log("testing 123 works!")
   }

  //login user email & password
  //login user github
  
  //create new account email & passowrd

}
