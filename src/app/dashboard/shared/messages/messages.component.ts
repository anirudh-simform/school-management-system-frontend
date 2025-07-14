import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import {
  Conversation,
  CreateConversationDto,
  Message,
  MessagingUserSearchResult,
} from './models/messages.models';

@Component({
  selector: 'app-messages',
  imports: [ReactiveFormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  messageService = inject(MessageService);
  searchControl = new FormControl();

  conversationSearchList: MessagingUserSearchResult[] = [];
  conversationList: Conversation[] = [];

  currentConversation = {
    id: -1,
    name: '',
  };
  messageList: Message[] = [];

  showSearchList = false;

  show$ = of(this.showSearchList);

  ngOnInit(): void {
    this.messageService.connect();

    this.show$.subscribe((data) => {
      console.log(data);
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          console.log(this.showSearchList);
          if (this.searchControl.value.trim() == '') {
            this.showSearchList = false;
          }
        }),
        filter((value: string) => {
          return value.trim() !== '';
        }),
        switchMap((value: string) => {
          return this.messageService.searchConversations({ query: value });
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.showSearchList = true;
        this.conversationSearchList = (data as any).fetch;
      });

    this.messageService.getOwnConversations().subscribe((data) => {
      console.log(data);
    });
  }

  onNewConversation(userId: string, conversationName: string) {
    const createConversationDto: CreateConversationDto = {
      participantIds: [userId],
      isGroup: false,
    };

    this.messageService
      .createConversation(createConversationDto)
      .subscribe((data) => {
        this.currentConversation.id = data.id;
        this.currentConversation.name = conversationName;
        this.messageList = [];
        console.log(data);
      });
  }
}
