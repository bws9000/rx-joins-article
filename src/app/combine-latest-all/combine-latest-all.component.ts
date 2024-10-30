import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, interval, of } from 'rxjs';
import { combineLatestAll, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  template: '',
  standalone: true,
})
export class CombineLatestAllComponent implements OnInit {
  constructor(private router: Router) {}
  innerObservables$: Observable<number[]> | undefined;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) console.clear();
    });

    const outerObservable$ = of(
      interval(1000).pipe(
        map((val) => val + 1),
        take(2),
        tap((val) => console.log('Observable 1 emits:', val))
      ),
      interval(1500).pipe(
        map((val) => (val + 1) * 10),
        take(2),
        tap((val) => console.log('Observable 2 emits:', val))
      ),
      interval(2000).pipe(
        map((val) => (val + 1) * 100),
        take(2),
        tap((val) => console.log('Observable 3 emits:', val))
      )
    );

    this.innerObservables$ = outerObservable$.pipe(
      combineLatestAll(),
      tap((values) => console.log('Combined Values:', values))
    );

    this.innerObservables$.subscribe();
  }
}
