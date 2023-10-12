import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: any;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.getStudentsList();
    // alert(this.students.length)
  }

  getStudentsList() {
    this.studentService.getStudentsList().subscribe((s: any) => this.students= s);
  }

  deleteStudents() {
    this.studentService.deleteAll();
  }

}
