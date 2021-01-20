export class Message {
    id: number;
    senderId: number;
    receiverId: number;
    senderConnectionId: string;
    receiverConnectionId: string;
    type: string;
    message: string;
    date: Date;
}