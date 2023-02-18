

export class Comment {
    id: string;
    user: string;
    message: string;
    date: number;

    constructor (id : string, user : string, message : string) {
        this.id = id;
        this.user = user;
        this.message = message;
        this.date = Date.now();
    }
    /**
     * Changes the message in the comment
     * @param newMessage new message of comment
     */
    changeMessage(newMessage : string) {
        this.message = newMessage;
    }
}