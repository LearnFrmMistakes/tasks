import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http : HttpClient) { }
  usersAPI : string = 'https://randomuser.me/api';
  weatherAPI: string = 'https://api.open-meteo.com/v1/forecast?';
  tasksAPI: string = 'http://localhost:3000/tasks';

  fetchUsersData(): Observable<any>{
    return this._http.get(this.usersAPI);
  }

  fetchWeatherInformation(stringtobeAppended: string): Observable<any>{
    const finalWeatherString = this.weatherAPI.concat(stringtobeAppended);
    return this._http.get(finalWeatherString);
  }

  getAllTasks(): Observable<any>{
    return this._http.get(this.tasksAPI);
  }

  addTask(addObject: any): Observable<any>{
    return this._http.post(this.tasksAPI,addObject);
  }

  deleteTask(taskId : any): Observable<any>{
    return this._http.delete(this.tasksAPI+"/"+taskId);
  }

  updateTask(updateObject : any): Observable<any>{
    return this._http.put(this.tasksAPI + '/' + updateObject.id,updateObject);
  }
}
