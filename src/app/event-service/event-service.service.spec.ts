import { TestBed, inject } from '@angular/core/testing';

import { EventServiceService } from './event-service.service';

describe('EventServiseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventServiceService]
    });
  });

  it('should be created', inject([EventServiceService], (service: EventServiceService) => {
    expect(service).toBeTruthy();
  }));
});
