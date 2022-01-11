import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: any;

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.getStudentsList()
  }

  getStudentsList() {
    this.studentsService.getStudentsCollection().snapshotChanges().pipe(map(changes => {
      return changes.map(c => 
        // @ts-ignore
        ({ key: c.payload.doc.id, ...c.payload.doc.data() })
      )
    })).subscribe(students => {
      this.students = students
    })
  }

  deleteStudents() {
    this.studentsService.deleteAll()
  }
}
