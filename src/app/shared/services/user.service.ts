import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../core/config/app-config';
import { Observable } from 'rxjs';
import { User } from '../../data/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly _url: string;

  constructor(private _http: HttpClient) {
    this._url = AppConfig.INSTANCE.apiEndpoint;
  }

  public getUser(id: string): Observable<User> {
    return this._http.get<User>(`${this._url}/user/${id}`);
  }
}
