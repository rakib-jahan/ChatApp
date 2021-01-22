import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable()
export class ChatService {

    constructor(private _http: HttpClient) {
    }

    getChatLog(senderId: number, receiverId: number) {
        return this._http.get<Message[]>(`${window.location.origin}/chats/chatLog?senderId=${senderId}&receiverId=${receiverId}`);
    }

    deleteChat(id: number) {
        return this._http.post(`${window.location.origin}/chats/deleteChat?id=${id}`, {});
    }
}