import { FormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StudentService } from './student.service';

describe('StudentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
  }));

  it('should be created', () => {
    const service: StudentService = TestBed.get(StudentService);
    expect(service).toBeTruthy();
  });
});
