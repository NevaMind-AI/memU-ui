import type { Conversation } from '../../types/conversation';
import type { MemorizeResponse, RetrieveResponse } from '../../types/memory';

export const memorize = async (conversation: Conversation): Promise<MemorizeResponse | null> => {
    try {
        const response = await fetch('/api/memorize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "content": conversation.content
            })
        });
        console.log('[PlaygroundPage] memorize response', response);
        return response.json();
    } catch (error) {
        console.error('[PlaygroundPage] client.ts: memorize: Failed to memorize', error);
        return null;
    }
}

export const retrieve = async (query: string): Promise<RetrieveResponse | null> => {
    try {
        const response = await fetch('/api/retrieve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "query": query
            })
        });
        console.log('[PlaygroundPage] retrieve response', response);
        return response.json();
    } catch (error) {
        console.error('[PlaygroundPage] client.ts: retrieve: Failed to retrieve', error);
        return null;
    }
}