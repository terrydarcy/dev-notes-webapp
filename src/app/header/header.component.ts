import { Component, HostBinding, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  toggleControl = new FormControl(false);

  @HostBinding('class') className = '';

  constructor(public overlay: OverlayContainer) {}

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      let parentRef = this.overlay.getContainerElement().parentElement;
      if (darkMode && parentRef) {
        parentRef.classList.add(darkClassName);
      } else if (parentRef) {
        parentRef.classList.remove(darkClassName);
      }
    });
  }
}
