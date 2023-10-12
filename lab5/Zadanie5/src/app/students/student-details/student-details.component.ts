import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {

  @Input() student: Student= {} as Student;

  constructor (private studentService: StudentService) { }

  deleteStudent() {
    if (this.student != null)
      this.studentService.deleteStudent(this.student.key);
  }
}
