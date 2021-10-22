import { Component, OnInit } from '@angular/core';
import { Records } from 'src/app/models/record.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private dataService: DataService) { }

  totalMarks: number
  leaderboardRecords = [];
  
  ngOnInit(): void {
    this.totalMarks = this.dataService.totalMarks;
    this.dataService.getRecord().then(snapshot => {
      this.leaderboardRecords = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...(doc.data() as {}),
        } as Records;
      })
    })
    
  }

}
