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
    uniqueID: string = new Date().getTime().toString();
    messages = new Array<Message>();
    message = new Message();

    user: User;

    private _hubConnection : HubConnection;
    onlineUser: any[];

    constructor(
        //private chatService: ChatService,
        //private _ngZone: NgZone,
        private accountService: AccountService,
        private router: Router,
    ) {
        this.user = this.accountService.getUserInfo;

        if (!this.user) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit(): void {
        //this.subscribeToEvents();
        this.signalrConn();
    }

    //logout() {
    //    this.chatService.destroyConnection();
    //    this.accountService.logout();
    //    this.router.navigate(['./login']);
    //}

    sendMessage(): void {
        if (this.txtMessage) {
            this.message = new Message();
            this.message.clientuniqueid = this.uniqueID;
            this.message.type = "sent";
            this.message.message = this.txtMessage;
            this.message.date = new Date();
            this.messages.push(this.message);
            //this.chatService.sendMessage(this.message);
            this.txtMessage = '';
        }
    }

    private subscribeToEvents(): void {

        //this.chatService.messageReceived.subscribe((message: Message) => {
        //    this._ngZone.run(() => {
        //        if (message.clientuniqueid !== this.uniqueID) {
        //            message.type = "received";
        //            this.messages.push(message);
        //        }
        //    });
        //});

        //this.chatService.userConnected.subscribe((connections: any[]) => {
        //    debugger;
        //});

        //this.chatService.userDisconnected.subscribe((connectionId: string) => {

        //});
    }

    signalrConn() {

        this._hubConnection = new HubConnectionBuilder()
            .withUrl(`${window.location.origin}/MessageHub?email=${this.user.email}`)
            .build();

        //Call client methods from hub to update User
        this._hubConnection.on('UpdateUserList', (onlineuser) => {
            var users = JSON.parse(JSON.stringify(onlineuser));
            this.onlineUser = [];
            for (var key in users) {
                if (users.hasOwnProperty(key)) {
                    if (key !== this.user.email) {
                        this.onlineUser.push({
                            userName: key,
                            connection: users[key]
                        });
                    }
                }
            }
        });

        this._hubConnection.on('MessageReceived', (data: any) => {
            
        });

        //Start Connection
        this._hubConnection
            .start()
            .then(function () {
                console.log("Connected");
            }).catch(function (err) {
                return console.error(err.toString());
            });
    }

    ngOnDestroy() {
        //Stop Connection
        //this._hubConnection
        //    .stop()
        //    .then(function () {
        //        console.log("Stopped");
        //    }).catch(function (err) {
        //        return console.error(err.toString());
        //    });
    }
}