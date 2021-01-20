import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let ChatService = class ChatService {
    constructor(_http) {
        this._http = _http;
    }
    getChatLog(senderId, receiverId) {
        return this._http.get(`${window.location.origin}/chats/chatLog?senderId=${senderId}&receiverId=${receiverId}`);
    }
};
ChatService = __decorate([
    Injectable()
], ChatService);
export { ChatService };
//# sourceMappingURL=chat.service.js.map