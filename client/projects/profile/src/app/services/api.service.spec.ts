import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ApiService, provideHttpClientTesting(), provideHttpClient(withInterceptorsFromDi())]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an HTTP GET request and return data', () => {
    const testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    const testHeaders = { 'Authorization': 'Bearer token' };
    const mockResponse = {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    };

    // Call the get method of the service
    service.get(testUrl, testHeaders).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Check if the response matches the mock data
    });
  })
});
