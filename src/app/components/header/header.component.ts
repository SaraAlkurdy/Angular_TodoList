import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  languageList = document.getElementById('switch-lang');
  body = document.getElementById('body');
  header = document.getElementsByClassName('sub-header')[0];
  theme = document.getElementsByTagName('link')[0];

  handleSwitchLang(event: any) {
    let lang = event.target.value;

    switch (lang) {
      case 'en':
        this.body!.style.direction = 'ltr';
        document.documentElement.setAttribute('lang', 'en');
        break;
      case 'ar':
        this.body!.style.direction = 'rtl';
        document.documentElement.setAttribute('lang', 'ar');
        break;
      default:
        this.body!.style.direction = 'ltr';
    }
  }
}
