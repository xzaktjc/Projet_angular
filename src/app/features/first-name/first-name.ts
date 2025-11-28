import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-first-name',
  imports: [FormsModule],
  templateUrl: './first-name.html',
  styleUrl: './first-name.scss',
})
export class FirstName {
  firstName = 'Angular';

  newFirstName = '';

  firstNameAvailables = ['Angular', 'React', 'Vue', 'Svelte'];
  public changeFirstName(newName: string): void {
    this.firstName = newName;
  }

  public addFirstName(firstName: string): void {
    if (!firstName) {
      return;
    }

    const isUnique = !this.firstNameAvailables.includes(firstName);
    if (isUnique) {
      this.firstNameAvailables.push(firstName);
      this.newFirstName = '';
    }
  }
}
