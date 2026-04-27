import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { routeTransition } from './route-animations';

import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeTransition],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
