import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class TimerService {

  private countdownTimerRef: any = null;

  public paused: boolean = true;
  private init: number = 0;
  private countdownEndSource = new Subject<void>();
  private countdownSource = new BehaviorSubject<number>(0);
  public countdownEnd$ = this.countdownEndSource.asObservable();
  public countdown$ = this.countdownSource.asObservable();

  get isCountdownEnded(): boolean {
    return this.countdownSource.getValue() <= 0;
  }

  destroy(): void {
    this.clearTimeout();
  }

  restartCountdown(init?: any) {
    if (init) {
      this.init = init;
    }

    if (this.init && this.init > 0) {
      this.paused = true;
      this.clearTimeout();
      this.countdownSource.next(this.init);
    }
  }

  toggleCountdown() {
    this.paused = !this.paused;
    this.paused ? this.clearTimeout() : this.doCountdown();
  }

  private doCountdown() {
    if (this.isCountdownEnded) return;

    this.countdownTimerRef = setTimeout(() => {
      this.countdownSource.next(this.countdownSource.getValue() - 1);
      this.processCountdown();
    }, 1000);
  }

  private processCountdown() {
    this.isCountdownEnded ? this.countdownEndSource.next() : this.doCountdown();
  }

  private clearTimeout() {
    if (!this.countdownTimerRef) return

    clearTimeout(this.countdownTimerRef);
    this.countdownTimerRef = null;
  }

}
