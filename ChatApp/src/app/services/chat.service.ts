import { EventEmitter, Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Message } from '../models/message';
import { AccountService } from './account.service';

@Injectable()
export class ChatService {

    messageReceived = new EventEmitter<Message>();
    connectionEstablished = new EventEmitter<Boolean>();
    userConnected = new EventEmitter<string>();
    userDisconnected = new EventEmitter<string>();

    private connectionIsEstablished = false;
    private _hubConnection!: HubConnection;

    constructor() {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    sendMessage(message: Message) {
        this._hubConnection.invoke('NewMessage', message);
    }

    private createConnection() {
        var email = 'rakib@gmail.com';
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(`${window.location.origin}/MessageHub?email=${email}`)
            .build();
    }

    private startConnection(): void {
        this._hubConnection
            .start()
            .then(() => {
                this.connectionIsEstablished = true;
                console.log('Hub connection started');
                this.connectionEstablished.emit(true);
            })
            .catch(err => {
                console.log('Error while establishing connection, retrying...');
                setTimeout(() => { this.startConnection(); }, 5000);
            });
    }

    private registerOnServerEvents(): void {

        this._hubConnection.on('MessageReceived', (data: any) => {
            this.messageReceived.emit(data);
        });

        this._hubConnection.on('UserConnected', (data: any) => {
            this.userConnected.emit(data);
        });

        //this._hubConnection.on('UserDisconnected', (data: any) => {
        //    console.log('UserDisconnected : ' + data);
        //    this.userDisconnected.emit(data);
        //});
    }

    destroyConnection() {
        this._hubConnection
            .stop()
            .then(function () {
                console.log("Stopped");
            }).catch(function (err) {
                return console.error(err.toString());
            });
    }
}
