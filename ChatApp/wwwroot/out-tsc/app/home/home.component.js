import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Message } from '../models/message';
let HomeComponent = class HomeComponent {
    constructor(chatService, _ngZone, accountService, router) {
        this.chatService = chatService;
        this._ngZone = _ngZone;
        this.accountService = accountService;
        this.router = router;
        this.title = 'ClientApp';
        this.txtMessage = '';
        this.uniqueID = new Date().getTime().toString();
        this.messages = new Array();
        this.message = new Message();
        this.user = this.accountService.getUserInfo;
        if (!this.user) {
            this.router.navigate(['/login']);
        }
    }
    ngOnInit() {
        this.subscribeToEvents();
    }
    //logout() {
    //    this.chatService.destroyConnection();
    //    this.accountService.logout();
    //    this.router.navigate(['./login']);
    //}
    sendMessage() {
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
    subscribeToEvents() {
        this.chatService.messageReceived.subscribe((message) => {
            this._ngZone.run(() => {
                if (message.clientuniqueid !== this.uniqueID) {
                    message.type = "received";
                    this.messages.push(message);
                }
            });
        });
        //this.chatService.userConnected.subscribe((connectionId: string) => {
        //    this.user.connectionId = connectionId;
        //});
        //this.chatService.userDisconnected.subscribe((connectionId: string) => {
        //});
    }
};
HomeComponent = __decorate([
    Component({
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.css']
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map