import {
  AfterContentInit, AfterViewInit, Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { SimpleAlertViewComponent } from '../simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentInit, AfterViewInit {
  public isAddTimerVisible: boolean = false;
  public time: number = 0;
  public timers: number[] = [3];
  @ViewChild('timerInput') timeInput!: ElementRef;
  @ViewChild('alert', { read: ViewContainerRef }) alertContainer!: ViewContainerRef;

  constructor(
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log({ timerInput: this.timeInput });

    this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', 'enter seconds');
    this.renderer.addClass(this.timeInput.nativeElement, 'time-in');
  }

  ngAfterContentInit() {
  }

  public showAddTimer() {
    this.isAddTimerVisible = true;
    this.time = 0;
    setTimeout(() => this.renderer.selectRootElement(this.timeInput.nativeElement).focus());
  }

  public hideAddTimer() {
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert() {
    this.alertContainer.clear();
    const simpleAlertComponentRef = this.alertContainer.createComponent(SimpleAlertViewComponent);

    simpleAlertComponentRef.instance.title = 'timer ended';
    simpleAlertComponentRef.instance.message = 'your countdown has finished';
    simpleAlertComponentRef.instance.onDismiss.subscribe(() => simpleAlertComponentRef.destroy());

    simpleAlertComponentRef.instance.show();
  }

  public submitAddTimer() {
    this.timers.push(this.time);
    this.hideAddTimer();
  }

}
