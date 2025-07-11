import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  messageService = inject(MessageService);
  ngOnInit(): void {
    this.messageService.connect();
  }
}
