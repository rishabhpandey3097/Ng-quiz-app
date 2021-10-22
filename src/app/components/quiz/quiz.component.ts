import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy } from "@angular/core";
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Records } from 'src/app/models/record.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  @ViewChild('optionValue') optionValue: any;

  constructor(private authService: AuthService,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private notifierService: NotifierService,
    private dataService: DataService) { }

  questionsArray = [
    {
      id: 0,
      question: "Who voices Elsa in Frozen?",
      options: [
        "Idina Menzel",
        "Emma Stone",
        "Denise Richards",
        "Amanda Seyfried"
      ],
      correctOption: "Idina Menzel"
    },
    {
      id: 1,
      question: "In what year was the first iPhone released?",
      options: ['2007', '2006', '2005', '2008'],
      correctOption: '2007'
    },
    {
      id: 2,
      question: "What’s the name of the dog in The Simpsons?",
      options: ["bruno", "Dodgy", "Diggle", "Santa’s Little Helper"],
      correctOption: "Santa’s Little Helper"
    },
    {
      id: 3,
      question: "In the Bible, which character is known for building an ark?",
      options: ["Noah", "Arnold", "James Gunn", "John Cena"],
      correctOption: "Noah"
    },
    {
      id: 4,
      question: "Which American rapper released The College Dropout in 2004?",
      options: ["Drake", "Lil Wayne", "Eminem", "Kanye West"],
      correctOption: "Kanye West"
    }
  ]

  currentQuestion 
  totalMarks = 0;
  leaderboardRecords = [];

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.shuffle(this.questionsArray)
    this.currentQuestion = this.questionsArray[0]
    this.questionsArray.splice(0, 1);
  }

  evaluateAnswer(question, selectedOption: string) {
    if (selectedOption == this.currentQuestion.correctOption) {
      this.totalMarks = this.totalMarks + 1;
      this.optionValue.selectionList.selectedOptions.selected[0]._element.nativeElement.style.backgroundColor = 'green'
    }
    else if (selectedOption !== this.currentQuestion.correctOption) {
      this.optionValue.selectionList.selectedOptions.selected[0]._element.nativeElement.style.backgroundColor = 'red'
    }
    else {
      this.optionValue.selectionList.selectedOptions.selected[0]._element.nativeElement.style.backgroundColor = ''
    }

    setTimeout(() => {
      if (0 === this.questionsArray.length) {
        this.endQuiz()
      } else {
        var index = Math.floor(Math.random() * this.questionsArray.length) + 0;
        this.currentQuestion = this.questionsArray[index]
        this.questionsArray.splice(index, 1);
      }
    }, 300);
  }


  shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  endQuiz() {
    this.authService.user$.subscribe((user: User) => {
      const record: Records = {
        totalMarks: this.totalMarks,
        userName: user.displayName,
        userId: user.uid,
        createdOn: Date.now()
      }
      this.dataService.getRecordByUser(user.uid).then(snapshot => {
        this.leaderboardRecords = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...(doc.data() as {}),
          } as Records;
        })
        if (!this.leaderboardRecords.length) {
          this.dataService.createRecord(record).then(result => {
            this.router.navigateByUrl('result');
            this.notifierService.notify(
              'success',
              'Quiz Completed🚀'
            );
          })
        } else {
          const record: Records = {
            id: this.leaderboardRecords[0].id,
            totalMarks: this.totalMarks,
            createdOn: Date.now()
          }
          this.dataService.updateRecord(record);
          this.router.navigateByUrl('result');
          this.notifierService.notify(
            'success',
            'Quiz Completed🚀'
          );
        }

      })
    })

  }

  ngOnDestroy() {
    this.dataService.totalMarks = this.totalMarks;
  }
}
