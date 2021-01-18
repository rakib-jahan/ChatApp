import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../models/message';
import { ChatService } from '../services/chat.service';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    title = 'ClientApp';
    txtMessage: string = '';
    uniqueID: string = new Date().getTime().toString();
    messages = new Array<Message>();
    message = new Message();

    user: User;

    constructor(
        private chatService: ChatService,
        private _ngZone: NgZone,
        private accountService: AccountService,
        private router: Router,
    ) {
        this.user = this.accountService.getUserInfo;

        if (!this.user) {
            this.router.navigate(['/login']);
        }
        else
            this.subscribeToEvents();
    }

    ngOnInit(): void {        
    }

    logout() {
        this.chatService.destroyConnection();
        this.accountService.logout();
        this.router.navigate(['./login']);
    }

    sendMessage(): void {
        if (this.txtMessage) {
            this.message = new Message();
            this.message.clientuniqueid = this.uniqueID;
            this.message.type = "sent";
            this.message.message = this.txtMessage;
            this.message.date = new Date();
            this.messages.push(this.message);
            this.chatService.sendMessage(this.message);
            this.txtMessage = '';
        }
    }

    ngOnDestroy() {
        //this.chatService.destroyConnection();
    }

    private subscribeToEvents(): void {

        this.chatService.messageReceived.subscribe((message: Message) => {
            this._ngZone.run(() => {
                if (message.clientuniqueid !== this.uniqueID) {
                    message.type = "received";
                    this.messages.push(message);
                }
            });
        });

        this.chatService.userConnected.subscribe((connectionId: string) => {
            this.user.connectionId = connectionId;
        });

        this.chatService.userDisconnected.subscribe((connectionId: string) => {
            
        });
    }

}
