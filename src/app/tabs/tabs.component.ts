import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { Tab } from '../tab/tab.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  @ContentChildren(TabComponent) public tabs!: QueryList<TabComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  ngAfterContentInit() {
    this.selectTab(this.tabs.first);
  }

  selectTab(tab: Tab) {
    this.tabs.forEach(tab => tab.isActive = false);
    tab.isActive = true;
  }

}
