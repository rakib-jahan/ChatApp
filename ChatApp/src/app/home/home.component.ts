import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

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
        this.accountService.getAllUsers()
            .subscribe(
                response => {
                    var users = response;
                    users.forEach((user: any) => {
                        if (user.email !== this.user.email) {
                            this.onlineUser.push(user);
                        }                        
                    });
                }, error => {
                    console.log(error);
                }
            );

        this.scrollToBottom();

        this._hubConnection = new HubConnectionBuilder()
            .withUrl(`${window.location.origin}/MessageHub?email=${this.user.email}`)
            .build();

        this._hubConnection
            .start()
            .then(() => console.log('user ' + this.user.email + ' connected - ' + Date().toString()))
            .catch(err => console.log('Error while establishing connection :('));

        this._hubConnection.on('ReceivedMessage', (message: Message) => {
            message.type = "received";
            this.messages.push(message);
        });

        this._hubConnection.on('UpdateUserList', (onlineuser) => {
            var user = JSON.parse(JSON.stringify(onlineuser));
            var searchUser = this.onlineUser.find(element => element.id == user.id);
            if (searchUser) {
                searchUser.connectionId = user.connectionId;
                searchUser.isConnected = user.isConnected;
            }
            else {
                if (user.email !== this.user.email) {
                    this.onlineUser.push(user);
                }                
            }                
        });
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
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

    deleteChat(msg: Message) {
        msg.isDeleted = true;
        this.chatService.deleteChat(msg.id)
            .subscribe(
                response => {
                    console.log('deleteChat success : ' + msg.id);
                }, error => {
                    console.log(error);
                }
            );
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
                                if (chat.senderId == this.user.id) {
                                    chat.type = "sent";
                                }
                                else {
                                    chat.type = "received";
                                }
                                this.messages.push(chat);
                            });
                            this.scrollToBottom();
                        }
                    }
                }, error => {
                    console.log(error);
                }
            );
    }

    ngOnDestroy() {
        if (this._hubConnection) {
            this._hubConnection
                .stop()
                .then(function () {
                    console.log("Stopped");
                })
                .catch(function (err) {
                    return console.error(err.toString());
                });
        }
    }
}