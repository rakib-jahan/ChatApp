import { __decorate } from "tslib";
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@aspnet/signalr';
let ChatService = class ChatService {
    constructor() {
        this.messageReceived = new EventEmitter();
        this.connectionEstablished = new EventEmitter();
        this.userConnected = new EventEmitter();
        this.userDisconnected = new EventEmitter();
        this.connectionIsEstablished = false;
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }
    sendMessage(message) {
        this._hubConnection.invoke('NewMessage', message);
    }
    createConnection() {
        var email = 'rakib@gmail.com';
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(`${window.location.origin}/MessageHub?email=${email}`)
            .build();
    }
    startConnection() {
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
    registerOnServerEvents() {
        this._hubConnection.on('MessageReceived', (data) => {
            this.messageReceived.emit(data);
        });
        this._hubConnection.on('UserConnected', (data) => {
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
};
ChatService = __decorate([
    Injectable()
], ChatService);
export { ChatService };
//# sourceMappingURL=chat.service.js.map