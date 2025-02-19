import { inject, Injectable, signal } from '@angular/core';
import {
  ExerciseSet,
  ExerciseSetList,
  ExerciseSetListAPI,
} from '../interfaces/exercise-set';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseSetsService {
  constructor() {}

  private httpClient = inject(HttpClient);
  private url = 'diary';
  exerciseList = signal<ExerciseSetList>([] as ExerciseSetList);

  getInitialList() {
    const headers = new HttpHeaders().set('X-TELEMETRY', 'true');
    this.httpClient
      .get<ExerciseSetListAPI>(this.url, { headers })
      .pipe(map((api) => api?.items))
      .subscribe((list) => this.exerciseList.set(list));
  }

  refreshList(): Observable<ExerciseSetList> {
    return this.httpClient
      .get<ExerciseSetListAPI>(this.url)
      .pipe(map((api) => api?.items));
  }

  addNewItem(item: Partial<ExerciseSet>): Observable<ExerciseSet> {
    return this.httpClient.post<ExerciseSet>(this.url, item);
  }

  updateItem(id: string, item: Partial<ExerciseSet>): Observable<ExerciseSet> {
    return this.httpClient.put<ExerciseSet>(`${this.url}/${id}`, item);
  }

  getItem(id: string): Observable<ExerciseSet> {
    return this.httpClient.get<ExerciseSet>(`${this.url}/${id}`);
  }

  deleteItem(id: string) {
    this.httpClient.delete<boolean>(`${this.url}/${id}`).subscribe(() => {
      this.exerciseList.update((list) => list.filter((exerciseSet) => exerciseSet.id !== id))
    });
  }
}
