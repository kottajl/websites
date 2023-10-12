import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Student } from '../student';
import { StudentService } from '../../services/student.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})

export class CreateStudentComponent {

  studentsList: Array<Student>= [];
  student: Student= new Student(0, "", 0);
  newKey: number= 0;
  submitted= false;

  constructor(private StudentService: StudentService) {
    this.StudentService.getStudentsList().subscribe((sub: any) => {
      this.studentsList= sub;
      for (let student of this.studentsList)
        this.newKey= Math.max(this.newKey, student.key + 1);
    });
  }

  ngOnInit() {
  }

  newStudent(): void {
    this.submitted= false;
  }

  save() {
    this.StudentService.getStudentsList().pipe(take(1)).subscribe(sub => {
      this.student.key= this.newKey;
      this.StudentService.createStudent(this.student);
    });
  }

  onSubmit() {
    this.submitted= true;
    this.save();
  }

}
