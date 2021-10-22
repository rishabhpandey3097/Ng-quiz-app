import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';


import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ResultComponent } from './components/result/result.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from "src/environments/environment";

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { Constants } from './constants/constants';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ResultComponent,
    QuizComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireModule.initializeApp(environment.firebaseConfig),

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,

    NotifierModule,
    NotifierModule.withConfig(Constants.notifierOptions),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
