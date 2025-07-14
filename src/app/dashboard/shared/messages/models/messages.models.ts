export type MessagingUserSearchResult = {
  id: string | null; // User ID or null if it's a conversation
  firstname: string | null; // First name of the user or null if it's a conversation
  lastname: string | null; // Last name of the user or null if it's a conversation
  conversation_name: string | null; // Name of the conversation or null if it's a user
  conversation_id: string; // ID of the conversation
  has_chatted: boolean; // Indicates if the user has chatted
  type: 'user' | 'conversation'; // Type of the result: 'user' or 'conversation'
};

export type ConversationMessage = {
  id: string; // ID of the message
  content: string; // Content of the message
  createdAt: string; // Timestamp when the message was created
  sender: {
    firstname: string; // First name of the sender
    lastname: string; // Last name of the sender
  };
};

export type Conversation = {
  id: string; // ID of the conversation
  name: string | null; // Name of the conversation (null for private conversations)
  lastMessageAt: string; // Timestamp of the last message in the conversation
  schoolId: number; // ID of the school associated with the conversation
  participants: Array<{
    userId: string; // ID of the participant
  }>;
  messages: ConversationMessage[]; // Array of messages (limited to the most recent one)
};

export type GetAllConversationsResponse = {
  fetch: Conversation[]; // Array of conversations
};

export type CreateConversationDto = {
  participantIds: string[];
  name?: string;
  isGroup?: boolean;
};

export type CreateConversationResponse = {
  participants: ({
    user: {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
    };
  } & {
    id: number;
    schoolId: number | null;
    userId: string;
    conversationId: number;
    joinedAt: Date;
    isAdmin: boolean;
  })[];
} & {
  name: string | null;
  isGroup: boolean;
  id: number;
  createdAt: Date;
  lastMessageAt: Date | null;
  schoolId: number;
};

export type Message = {
  id: number;
  createdAt: Date;
  schoolId: number | null;
  conversationId: number;
  updatedAt: Date;
  content: string;
  senderId: string;
};
