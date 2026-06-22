export interface Message {
  content: string;
  files: Attachment[];
  id: string;
  sender: "assistant" | "user";
  timestamp: Date;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
}
