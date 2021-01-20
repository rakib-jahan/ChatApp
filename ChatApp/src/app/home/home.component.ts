import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../models/message';
import { ChatService } from '../services/chat.service';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    title = 'ClientApp';
    txtMessage: string = '';

    messages = new Array<Message>();
    message = new Message();

    user: User;
    chatUser: User;
    onlineUser = Array<User>();

    private _hubConnection: HubConnection;

    constructor(private accountService: AccountService, private chatService: ChatService, private router: Router) {
        this.user = this.accountService.getUserInfo;
        if (!this.user) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit(): void {
        this.signalrConn();
    }

    sendMessage(): void {
        if (this.txtMessage) {
            this.message = new Message();
            this.message.senderId = this.user.id;
            this.message.receiverId = this.chatUser.id;
            this.message.senderConnectionId = this.user.connectionId;
            this.message.receiverConnectionId = this.chatUser.connectionId;
            this.message.type = "sent";
            this.message.message = this.txtMessage;
            this.message.date = new Date();
            this.messages.push(this.message);
            this._hubConnection.invoke('SendMessageToUser', this.message);
            this.txtMessage = '';
        }
    }

    selectUser(user) {
        this.chatUser = user;
        this.chatLog();
    }

    chatLog() {
        this.messages = [];
        this.chatService.getChatLog(this.user.id, this.chatUser.id)
            .subscribe(
                response => {

                    if (response != null) {
                        var chatLog = response;

                        if (chatLog.length > 0) {
                            this.messages = [];

                            chatLog.forEach((chat: Message) => {
                                if (chat.receiverId == this.user.id) {
                                    chat.type = "sent";
                                }
                                else {
                                    chat.type = "received";
                                }

                                this.messages.push(chat);
                            });
                        }
                    }
                }, error => {
                    console.log(error);
                }
            );
    }

    signalrConn() {

        this._hubConnection = new HubConnectionBuilder()
            .withUrl(`${window.location.origin}/MessageHub?email=${this.user.email}`)
            .build();

        this._hubConnection.on('UpdateUserList', (onlineuser) => {
            var users = JSON.parse(JSON.stringify(onlineuser));
            users.forEach((user: User) => {
                if (user.email !== this.user.email && !this.onlineUser.some(r => r.email === user.email)) {
                    this.onlineUser.push(user);
                }
                else {
                    this.user.connectionId = user.connectionId;
                    this.user.isConnected = user.isConnected;
                }
            });
        });

        this._hubConnection.on('ReceivedMessage', (message: Message) => {
            message.type = "received";
            this.messages.push(message);
        });

        this._hubConnection
            .start()
            .then(function () {
                console.log("Connected");
            }).catch(function (err) {
                return console.error(err.toString());
            });
    }

    ngOnDestroy() {
        if (this._hubConnection)
            this._hubConnection
                .stop()
                .then(function () {
                    console.log("Stopped");
                }).catch(function (err) {
                    return console.error(err.toString());
                });
    }
}