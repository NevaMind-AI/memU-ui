export interface ConversationItem {
  role: string
  content: ConversationItemTextContent
}

export interface ConversationItemTextContent {
  text: string
}

export interface Conversation {
  conversation_id: string
  content: ConversationItem[]
}

