import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiServiceService } from './api-service.service';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting],
      providers: [ApiServiceService]
    });
    service = TestBed.inject(ApiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request and return data', () => {
    const testUrl = 'https://api.example.com/data';
    const testHeaders = { 'Authorization': 'Bearer token' };
    const mockResponse = { data: 'mock data' };

    // Call the get method of the service
    service.get(testUrl, testHeaders).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Check if the response matches the mock data
    });

    // Expect the HTTP GET request to have been made with the correct URL and headers
    const req = httpMock.expectOne((request) => 
      request.method === 'GET' && request.url === testUrl && request.headers.get('Authorization') === 'Bearer token'
    );

    // Respond with mock data
    req.flush(mockResponse);
  })
});
