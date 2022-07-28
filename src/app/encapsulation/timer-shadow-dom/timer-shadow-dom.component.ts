import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TimerService } from 'src/app/timer/timer.service';

@Component({
  selector: 'app-timer-shadow-dom',
  templateUrl: './timer-shadow-dom.component.html',
  styleUrls: ['./timer-shadow-dom.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TimerShadowDomComponent implements OnInit, OnDestroy {

  @Input() init: number = 20;
  @Output() onComplete = new EventEmitter<void>();
  public countdown: number = 0;
  private _destroy: Subject<void> = new Subject();

  get progress() {
    console.log('getting progress');
    return (this.init - this.countdown) / this.init * 100;
  }

  get canPlay(): boolean {
    return this.timer.paused || this.timer.isCountdownEnded;
  }

  constructor(public timer: TimerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.timer.restartCountdown(this.init);

    this.timer.countdownEnd$
      .pipe(takeUntil(this._destroy))
      .subscribe(() => {
        this.onComplete.emit();
      });

    this.timer.countdown$
      .pipe(takeUntil(this._destroy))
      .subscribe((value: number) => {
        this.countdown = value;
        this.cdRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.timer.destroy();
    this._destroy.next();
    this._destroy.complete();
  }

}
