import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Message } from "../message";
import { ChatService } from "../chat.service";

@Component({
  selector: "app-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.css"]
})
export class ChatRoomComponent implements OnInit {
  username: string;
  messages: Message[] = [
    { username: "Lior", content: "Salut les amis" },
    { username: "Joseph", content: "Hoo salut ça va ?" }
  ];

  constructor(private route: ActivatedRoute, private service: ChatService) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get("username");

    this.service.messageRecu.subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  send(message: string) {
    const data: Message = {
      username: this.username,
      content: message
    };

    this.service.send(data);
    this.messages.push(data);
  }
}
