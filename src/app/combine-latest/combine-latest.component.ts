import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { combineLatestWith } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-basic-example',
  template: '',
  standalone: true,
})
export class CombineLatestComponent implements OnInit {
  constructor(private router: Router) {}
  combinedValues$: Observable<number[]> | undefined;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) console.clear();
    });

    const observable1$ = interval(1000).pipe(
      map((val) => val + 1),
      take(3),
      tap((val) => console.log('Observable 1 emits:', val))
    );

    const observable2$ = interval(1500).pipe(
      map((val) => (val + 1) * 10),
      take(3),
      tap((val) => console.log('Observable 2 emits:', val))
    );

    this.combinedValues$ = observable1$.pipe(
      combineLatestWith(observable2$),
      tap((values) => console.log('Combined Values:', values))
    );

    this.combinedValues$.subscribe();
  }
}
