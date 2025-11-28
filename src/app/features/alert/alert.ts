import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  firstName = 'Angular';

  firstNameAvailables = ['Angular', 'React', 'Vue', 'Svelte'];

  alertClickedNumber = 0;

  public alert(): void {
    window.alert('Alerte déclenchée !');
    this.alertClickedNumber++;
  }

  public changeFirstName(newName: string): void {
    this.firstName = newName;
  }
}
