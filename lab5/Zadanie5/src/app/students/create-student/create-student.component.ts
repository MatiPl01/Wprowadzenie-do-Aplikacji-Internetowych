import { Component } from '@angular/core';
import { Student } from '../student';
import { StudentsService } from '../../services/students.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {
  student: Student = new Student();
  submitted = false;

  constructor(private studentsService: StudentsService) { }

  newStudent(): void {
    this.student = new Student();
    this.submitted = false;
  }

  save(): void {
    this.studentsService.createStudent(this.student);
    this.student = new Student();
  }

  onSubmit(f: NgForm): void {
    if (f.valid) {
      this.submitted = true;
      this.save();
    }
  }
}
