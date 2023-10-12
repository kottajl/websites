import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-modify-student',
  templateUrl: './modify-student.component.html',
  styleUrls: ['./modify-student.component.css']
})

export class ModifyStudentComponent {
  student: Student= new Student(0, "", 0);
  submitted= false;
  
  constructor (private route: ActivatedRoute, private service: StudentService) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.getStudentsList().pipe(take(1)).subscribe(sub => {
        this.student= sub.filter((item: {key: number}) => item.key == params["key"])[0]
      });
    });
  }

  private update(): void {
    this.service.getStudentsList().pipe(take(1)).subscribe(() => this.service.updateStudent(this.student));
  }

  onSubmit() {
    this.submitted= true;
    this.update();
  }
}
