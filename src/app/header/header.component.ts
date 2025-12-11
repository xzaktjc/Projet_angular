import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openLang() {
    // logique pour ouvrir un sélecteur de langue ou un modal
    // par défaut on bascule en FR (exemple)
    console.log('Open language selector');
  }
}
