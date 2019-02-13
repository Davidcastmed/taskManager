import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- here
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component'; // <-- here
import { RouterModule, Routes } from '@angular/router';
import { MyrouterModule } from './myrouter/myrouter.module';
import { EventServiceService } from './event-service/event-service.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    MyrouterModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
  ],
  providers: [EventServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
