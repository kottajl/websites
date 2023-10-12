import { ParseSourceFile } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { take, Observable } from 'rxjs';
import { Student } from '../students/student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  students: Observable<any[]>; 

  constructor(private db: AngularFireDatabase) {
    this.students = this.db.list('Students').valueChanges();
  }

  createStudent(student: Student): void {
    this.db.list('Students').push({
      key: student.key,
      name: student.name,
      age: student.age
    } as Student);
  }

  updateStudent(student: Student) {
    this.db.list('Students').snapshotChanges().pipe(take(1)).subscribe((sub: any) => {
      for (let item of sub)
        if (item.payload.val().key == student.key)
          this.db.list('Students').update(item.payload.key, {name: student.name, age: student.age});
    });
  }

  deleteStudent(key: number) {
    this.deleteLoop(key, false);
  }

  getStudentsList()  {
    return this.students;
  }

  deleteAll() {
    this.deleteLoop(7, true);
  }

  private deleteLoop (key: number, all: boolean): void {
    this.db.list('Students').snapshotChanges().pipe(take(1)).subscribe((sub: any) => {
      for (let item of sub)
        if (all || item.payload.val().key == key)
          this.db.list('Students').remove(item.payload.key);
    });
  }

}

