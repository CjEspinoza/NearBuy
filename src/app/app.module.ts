import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SingUpComponent } from './components/authentication/sing-up/sing-up.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StoreComponent } from './components/store/store.component';

import { NavigationComponent } from './utilities/navigation/navigation.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './components/store/categories/categories.component';
import { InstantCanGoodsComponent } from './components/store/categories/instant-can-goods/instant-can-goods.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    SignInComponent,
    SingUpComponent,
    HowItWorksComponent,
    AboutUsComponent,
    ContactUsComponent,
    NotFoundComponent,
    StoreComponent,
    CategoriesComponent,
    InstantCanGoodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
