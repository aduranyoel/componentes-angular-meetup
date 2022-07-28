import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-alert-view',
  templateUrl: './simple-alert-view.component.html',
  styleUrls: ['./simple-alert-view.component.scss']
})
export class SimpleAlertViewComponent {

  @Input() message: string = '';
  @Input() title: string = '';
  @Output() onDismiss: EventEmitter<void> = new EventEmitter<void>();
  public visible:boolean = false;

  public dismiss(){
    this.visible = false;
    this.onDismiss.emit();
  }

  public show(){
    this.visible = true;
  }

}
