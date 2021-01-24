import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Message } from '../models/message';
import { HubConnectionBuilder } from '@aspnet/signalr';
let HomeComponent = class HomeComponent {
    constructor(accountService, chatService, router) {
        this.accountService = accountService;
        this.chatService = chatService;
        this.router = router;
        this.title = 'ClientApp';
        this.txtMessage = '';
        this.messages = new Array();
        this.message = new Message();
        this.onlineUser = Array();
        this.user = this.accountService.getUserInfo;
        if (!this.user) {
            this.router.navigate(['/login']);
        }
    }
    ngOnInit() {
        this.accountService.getAllUsers()
            .subscribe(response => {
            var users = response;
            users.forEach((user) => {
                if (user.email !== this.user.email) {
                    this.onlineUser.push(user);
                }
            });
        }, error => {
            console.log(error);
        });
        this.scrollToBottom();
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(`${window.location.origin}/MessageHub?email=${this.user.email}`)
            .build();
        this._hubConnection
            .start()
            .then(() => console.log('user ' + this.user.email + ' connected - ' + Date().toString()))
            .catch(err => console.log('Error while establishing connection :('));
        this._hubConnection.on('ReceivedMessage', (message) => {
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
        });
    }
    ngAfterViewChecked() {
        this.scrollToBottom();
    }
    scrollToBottom() {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) { }
    }
    sendMessage() {
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
    deleteChat(msg) {
        msg.isDeleted = true;
        this.chatService.deleteChat(msg.id)
            .subscribe(response => {
            console.log('deleteChat success : ' + msg.id);
        }, error => {
            console.log(error);
        });
    }
    chatLog() {
        this.messages = [];
        this.chatService.getChatLog(this.user.id, this.chatUser.id)
            .subscribe(response => {
            if (response != null) {
                var chatLog = response;
                if (chatLog.length > 0) {
                    this.messages = [];
                    chatLog.forEach((chat) => {
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
        });
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
};
__decorate([
    ViewChild('scrollMe')
], HomeComponent.prototype, "myScrollContainer", void 0);
HomeComponent = __decorate([
    Component({
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.css']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map