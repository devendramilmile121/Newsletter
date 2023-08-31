import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriberService } from './subscriber.service';
import { HttpClientModule } from '@angular/common/http';
import { AddSubscriberDialogComponent } from './add-subscriber-dialog/add-subscriber-dialog.component';

@NgModule({
  declarations: [AppComponent, AddSubscriberDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [SubscriberService],
  bootstrap: [AppComponent],
})
export class AppModule {}
