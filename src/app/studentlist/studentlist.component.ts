import { Component, OnInit } from '@angular/core';

import { Student } from '../interfaces/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit {

  students: Student[];
  isLoading: boolean;
  d: Date = new Date();

  constructor(private studentService: StudentService) {
      this.students = [];
      this.isLoading = true;
  }

  ngOnInit() {
      this.refreshList();
  }

  refreshList(newStudents?: Student[]) {
      this.isLoading = true;
      if (newStudents) {
          this.students = newStudents;
          this.isLoading = false;
      } else {
          this.studentService.getStudents().then(students => {
              this.students = students;
              this.isLoading = false;
          });
      }
  }

}
