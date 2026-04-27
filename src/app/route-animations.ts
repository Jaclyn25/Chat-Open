import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),
    query(':enter', [
      style({ transform: 'translateY(1.5rem)', opacity: 0 })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-in-out', style({ transform: 'translateY(-1.5rem)', opacity: 0 }))
      ], { optional: true }),
      query(':enter', [
        animate('400ms 100ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);
