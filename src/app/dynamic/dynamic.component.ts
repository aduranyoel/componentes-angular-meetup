import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdBannerComponent } from './ad-banner.component';
import { AdItem } from './ad-item';

import { AdService } from './ad.service';

@Component({
  standalone: true,
  selector: 'app-dynamic',
  template: `
    <app-ad-banner [ads]="ads"></app-ad-banner>
  `,
  styleUrls: ['./dynamic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    AdBannerComponent
  ]
})
export class DynamicComponent implements OnInit {
  ads: AdItem[] = [];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }
}
