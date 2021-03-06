import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './services/chat.service';
import { AccountService } from './services/account.service';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [ChatService, AccountService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
