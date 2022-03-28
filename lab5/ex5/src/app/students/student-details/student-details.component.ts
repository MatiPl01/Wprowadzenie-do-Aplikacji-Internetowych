import { Component, Input } from '@angular/core';
import { Student } from '../student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  @Input() student!: Student;

  constructor(private studentsService: StudentsService) {}

  deleteStudent(): void {
    console.log('delete in details', this.student)
    this.studentsService.deleteStudent(this.student.key)
  }

  updateStudentState(isActive: boolean): void {
    this.studentsService.updateStudent(this.student.key, { isActive })
  }
}
