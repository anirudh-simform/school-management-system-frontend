import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../../../../app.config';
import { CourseResponse } from '../courses.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = inject(BASE_URL);

  private http = inject(HttpClient);
  constructor() {}

  getAllCourses() {
    return this.http.get<CourseResponse>(this.baseUrl + '/course', {
      withCredentials: true,
    });
  }

  createCourse(body: { name: string; description: string }) {
    return this.http.post<{
      message: string;
      courses: { id: number; name: string; description: string }[];
      createdCourse: { id: number; name: string; description: string };
    }>(this.baseUrl + '/course', body, { withCredentials: true });
  }

  editCourse(id: number, body: { name: string; description: string }) {
    return this.http.put<{
      message: string;
      courses: { id: number; name: string; description: string }[];
      updatedCourse: { id: number; name: string; description: string };
    }>(this.baseUrl + `/course/${id}`, body, { withCredentials: true });
  }

  deleteCourse(id: number) {
    return this.http.delete<{
      message: string;
      courses: { id: number; name: string; description: string }[];
      deletedCourse: { id: number; name: string; description: string };
    }>(this.baseUrl + `/course/${id}`, { withCredentials: true });
  }
}
