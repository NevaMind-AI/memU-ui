export interface MemoryCategory {
    id: string;
    name: string;
    description: string;
    summary: string;
    score?: number;
}

export interface MemoryItem {
    id: string;
    resource_id: string;
    memory_type: string;
    summary: string;
    score?: number;
}

export interface MemoryResource {
    id: string;
    url: string;
    modality: string;
    local_path: string;
    caption: string | null;
}

export interface MemoryRelation {
    item_id: string;
    category_id: string;
}

export interface MemorizeResponse {
    status: string;
    result: {
        resource: MemoryResource;
        items: MemoryItem[];
        categories: MemoryCategory[];
        relations: MemoryRelation[];
    };
}

export interface RetrieveResponse {
    status: string;
    result: {
        resources: MemoryResource[];
        items: MemoryItem[];
        categories: MemoryCategory[];
        next_step_query: string;
        needs_retrieval: boolean;
        original_query: string;
        rewritten_query: string;
    };
}