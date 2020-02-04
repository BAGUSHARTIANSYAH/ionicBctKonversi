import { TestBed } from '@angular/core/testing';

import { ClassSupportService } from './class-support.service';

describe('ClassSupportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassSupportService = TestBed.get(ClassSupportService);
    expect(service).toBeTruthy();
  });
});
