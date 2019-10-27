import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Gender, Student } from './interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  readonly endPoint = 'http://pappgergely.info/progmatic/students';
  // students: Student[];
  nextId = 1;
  // TODO nextId field-et kivenni!

  constructor(private http: HttpClient) {
      // this.students = [];
  }

  getStudents(): Promise<Student[]> {
      return new Promise<Student[]>((resolve, reject) => {
          this.http.get(this.endPoint, { withCredentials: true }).toPromise()
            .then(response => {
                resolve( (response as any).students );
            }).catch(reject);
      });
      // return this.students;
  }

  addStudent(s: Student): Promise<object> {
      /*
      s.id = this.nextId++;
      this.students.push(s);
      */
      return this.http.post(this.endPoint, JSON.stringify({ student : s }), { withCredentials: true }).toPromise();
  }

  /*
  private getStudentIndex(id: number): number {
      let idx = -1;
      this.students.forEach((student, i) => {
          if (id === student.id) {
              idx = i;
              return false;
          }
      });
      return idx;
  }
  */

  modifyStudent(s: Student): Promise<Student[]> {
      /*
      const idx = this.getStudentIndex(s.id);
      if (idx !== -1) {
          this.students[idx] = s;
      }
      */
      return new Promise((resolve, reject) => {
          this.http.put(this.endPoint, JSON.stringify({ student: s }), {
              params: { id : s.id.toString() },
              withCredentials: true,
          }).toPromise().then(data => {
              if ((data as any).success) {
                  resolve( (data as any).students );
              } else {
                  if (data['error-code'] === 'not-valid-student-data') {
                      // valamit rosszul írt be a felhasználó
                      reject( data['error-infos'] );
                  } else {
                      // valami nagyobb baj van
                      reject();
                  }
              }
          }).catch(() => { reject(); });
      });
  }

  removeStudent(id: number): Promise<object> {
      /*
      const idx = this.getStudentIndex(id);
      if (idx !== -1) {
          this.students.splice(idx, 1);
      }
      */
      return this.http.delete(this.endPoint, {
          params: { id : id.toString() },
          withCredentials: true,
      }).toPromise();
  }

  getGenderArray(): any[] {
      const enumKeys = Object.keys(Gender);
      const genderEnum = [];
      for (const enumKey of enumKeys) {
          genderEnum.push( { key: enumKey, value: Gender[enumKey] } );
      }
      return genderEnum;
  }
}
