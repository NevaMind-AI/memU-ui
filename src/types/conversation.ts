export interface ConversationContentItem {
  role: string
  content: string
}

export interface ConversationContent {
  conversation_id: string
  content: ConversationContentItem[]
}

