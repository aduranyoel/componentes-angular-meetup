import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AlertViewComponent } from './alert-view/alert-view.component';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { AdService } from './dynamic/ad.service';
import { EncapsulationComponent } from './encapsulation/encapsulation.component';
import { TimerNoneComponent } from './encapsulation/timer-none/timer-none.component';
import { TimerShadowDomComponent } from './encapsulation/timer-shadow-dom/timer-shadow-dom.component';
import { HomeComponent } from './home/home.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertViewComponent,
    DisplayComponent,
    TimerNoneComponent,
    TimerShadowDomComponent,
    EncapsulationComponent,
    HomeComponent,
    ProgressBarComponent,
    SimpleAlertViewComponent,
    TabComponent,
    TabsComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'encapsulation', component: EncapsulationComponent },
      {
        path: 'dynamic',
        loadComponent: () => import('./dynamic/dynamic.component').then(m => m.DynamicComponent),
        providers: [AdService]
      },
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '/' },
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
