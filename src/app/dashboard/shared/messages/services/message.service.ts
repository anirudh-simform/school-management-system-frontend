import { Injectable, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from '../../../../auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../../app.config';
import {
  CreateConversationDto,
  CreateConversationResponse,
} from '../models/messages.models';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  socket: Socket | undefined = undefined;
  router = inject(Router);
  http = inject(HttpClient);
  BASE_URL = inject(BASE_URL);
  constructor(private authService: AuthService) {}

  connect() {
    this.socket = io('ws://localhost:8080/', {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnection: false,
    });

    let refreshing = false;
    this.socket.on('connect_error', (err) => {
      console.log(err.name);
      if (err.message == 'jwt expired' && !refreshing) {
        refreshing = true;
        console.log('refresh started');
        this.authService.refresh().subscribe({
          next: (data) => {
            console.log('inside data', data);
            refreshing = false;
            this.socket?.connect();
          },
          error: (err) => {
            console.log('inside error', err);
            refreshing = false;
            // this.router.navigate(['/login']);
          },
        });
      }
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }

  searchConversations(queryParams: any) {
    return this.http.get(`${this.BASE_URL}/conversation/search`, {
      withCredentials: true,
      params: queryParams,
    });
  }

  getOwnConversations() {
    return this.http.get(`${this.BASE_URL}/conversation/`, {
      withCredentials: true,
    });
  }

  createConversation(createConversationDto: CreateConversationDto) {
    return this.http.post<CreateConversationResponse>(
      `${this.BASE_URL}/conversation/`,
      createConversationDto,
      {
        withCredentials: true,
      }
    );
  }
}
