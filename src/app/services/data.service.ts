import { Injectable } from '@angular/core';
import { Records } from '../models/record.model';

import {AngularFirestore} from '@angular/fire/firestore'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public totalMarks : number;

  constructor(private firestore: AngularFirestore) {}

  getRecord() {
    return this.firestore.collection('records').ref.orderBy('totalMarks','desc').get();
  }

  getRecordByUser(userId) {
    return this.firestore.collection('records').ref.where('userId','==',userId).get();
  }

  createRecord(record: Records) {
    return this.firestore.collection('records').add(record);
  }

  updateRecord(record: Records){
    // delete record.id;
    this.firestore.doc('records/' + record.id).update(record);
}
}
