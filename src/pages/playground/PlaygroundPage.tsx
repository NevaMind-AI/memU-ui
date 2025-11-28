import { ChevronLeft, ChevronRight, DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { Box, Drawer, IconButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import React from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import type { Conversation, ConversationItem } from '../../types/conversation';
import { memorize } from './client';
import { CenterPanel, LeftPanel, RetrieveModal, RightPanel, type ConversationListItem } from './components';
import { createNewConversationFromItems, deleteConversation, generateConversationId, getConversation, listConversations, renameConversation, upsertConversation } from './data/store';
import type { MemorizeResponse } from '../../types/memory';

const PlaygroundPage: React.FC = () => {
    const [isLeftDrawerOpen, setIsLeftDrawerOpen] = React.useState(false);
    const [isRightDrawerOpen, setIsRightDrawerOpen] = React.useState(false);
    const { mode, toggleMode } = useThemeContext();
    const isDarkMode = mode === 'dark';

    const overlayRootSx: SxProps<Theme> = {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column' as const,
        paddingTop: 2,
    };

    const gridContainerSx: SxProps<Theme> = {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '240px minmax(0, 1fr) 320px',
        gap: 2,
        height: '100%',
        p: 2,
        pt: 6,
        width: '100%',
        boxSizing: 'border-box' as const,
        '@media (max-width:1200px)': {
            gridTemplateColumns: 'minmax(0, 1fr)'
        }
    };

    const panelBaseSx: SxProps<Theme> = {
        borderRadius: 2,
        border: (theme: Theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
        bgcolor: (theme: Theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        minWidth: 0,
    };

    const leftPanelSx: SxProps<Theme> = {
        ...panelBaseSx,
        display: 'block',
        '@media (max-width:1200px)': {
            display: 'none'
        }
    };

    const rightPanelSx: SxProps<Theme> = {
        ...panelBaseSx,
        display: 'block',
        '@media (max-width:1200px)': {
            display: 'none'
        }
    };

    const centerPanelSx: SxProps<Theme> = {
        minWidth: 0,
        overflow: 'hidden' as const,
        height: '100%',
    };

    // Conversations state
    const [conversations, setConversations] = React.useState<ConversationListItem[]>([]);
    const [selectedConversationId, setSelectedConversationId] = React.useState<string | undefined>(undefined);
    const [currentContent, setCurrentContent] = React.useState<Conversation | null>(null);
    const [hasUnsavedNew, setHasUnsavedNew] = React.useState<boolean>(false);
    const [isRetrieveModalOpen, setIsRetrieveModalOpen] = React.useState(false);

    // Load conversations on mount
    React.useEffect(() => {
        try {
            const files = listConversations();
            setConversations(files.map(f => ({ id: f.id, title: f.title })));
            if (files.length > 0) {
                const first = files[0];
                setSelectedConversationId(first.id);
                setCurrentContent({ conversation_id: first.id, content: first.content as ConversationItem[] });
            }
        } catch (e) {
            console.warn('Failed to load conversations', e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const refreshListAndSelect = (id: string) => {
        const files = listConversations();
        setConversations(files.map(f => ({ id: f.id, title: f.title })));
        setSelectedConversationId(id);
        const file = files.find(f => f.id === id);
        if (file) {
            setCurrentContent({ conversation_id: id, content: file.content as ConversationItem[] });
        }
    };

    const handleCreateConversation = () => {
        // Create unsaved session (not persisted yet)
        // Insert a temporary item at top for UI
        setConversations(prev => {
            const withoutTemp = prev.filter(c => c.id !== 'new');
            return [{ id: 'new', title: 'New conversation' }, ...withoutTemp];
        });
        setSelectedConversationId('new');
        setCurrentContent({ conversation_id: 'new', content: [] });
        setHasUnsavedNew(true);
    };

    const handleSelectConversation = (id: string) => {
        if (id === 'new') {
            setSelectedConversationId('new');
            setCurrentContent({ conversation_id: 'new', content: [] });
            setHasUnsavedNew(true);
            return;
        }
        // Selecting a persisted conversation - remove temp item if present
        setConversations(prev => prev.filter(c => c.id !== 'new'));
        const files = listConversations();
        const found = files.find(f => f.id === id);
        if (!found) { return; }
        setSelectedConversationId(id);
        setCurrentContent({ conversation_id: id, content: found.content as ConversationItem[] });
        setHasUnsavedNew(false);
    };

    const persistNewIfNeeded = (nextItems: ConversationItem[]): string => {
        if (hasUnsavedNew || !selectedConversationId) {
            const saved = createNewConversationFromItems(nextItems);
            refreshListAndSelect(saved.id);
            setHasUnsavedNew(false);
            return saved.id;
        }
        return selectedConversationId;
    };

    const appendAndSave = (id: string, nextItems: ConversationItem[]) => {
        const existing = getConversation(id);
        const title = existing?.title ?? (nextItems[0]?.content?.text?.slice(0, 100) || 'Untitled');
        upsertConversation({ id, title, content: nextItems });
        setCurrentContent({ conversation_id: id, content: nextItems });
        refreshListAndSelect(id);
    };

    const handleMemorize = React.useCallback(async (): Promise<MemorizeResponse | null> => {
        if (!currentContent || currentContent.content.length === 0) {
            console.warn('[PlaygroundPage] handleMemorize: no conversation content to send');
            return null;
        }
        return memorize(currentContent);
    }, [currentContent]);

    const handleRetrieve = React.useCallback(() => {
        setIsRetrieveModalOpen(true);
    }, []);

    const handleCloseRetrieveModal = React.useCallback(() => {
        setIsRetrieveModalOpen(false);
    }, []);

    return (
        <Box sx={overlayRootSx}>
            {/* Top-right controls */}
            <Box sx={{ position: 'absolute', top: 12, right: 20, display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                    color="inherit"
                    aria-label="toggle theme mode"
                    onClick={toggleMode}
                    sx={{
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        borderRadius: 1.5,
                        bgcolor: (theme) => theme.palette.action.hover,
                        '&:hover': {
                            bgcolor: (theme) => theme.palette.action.selected
                        }
                    }}
                >
                    {isDarkMode ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
                </IconButton>
                <Box sx={{ display: { xs: 'flex', lg: 'none' }, gap: 1 }}>
                    <IconButton color="inherit" aria-label="open left drawer" onClick={() => setIsLeftDrawerOpen(true)}>
                        <ChevronLeft />
                    </IconButton>
                    <IconButton color="inherit" aria-label="open right drawer" onClick={() => setIsRightDrawerOpen(true)}>
                        <ChevronRight />
                    </IconButton>
                </Box>
            </Box>

            {/* 3-column content area */}
            <Box sx={gridContainerSx}>
                {/* Left column */}
                <Box sx={{ ...leftPanelSx, p: 2, overflow: 'hidden', display: 'flex' }}>
                    <LeftPanel
                        conversations={conversations}
                        selectedId={selectedConversationId}
                        onCreateConversation={handleCreateConversation}
                        onSelectConversation={handleSelectConversation}
                        onRenameConversation={(id) => {
                            const current = listConversations().find(f => f.id === id);
                            const nextTitle = window.prompt('Rename conversation', current?.title || '');
                            if (nextTitle && nextTitle.trim()) {
                                renameConversation(id, nextTitle.trim());
                                const files = listConversations();
                                setConversations(files.map(f => ({ id: f.id, title: f.title })));
                            }
                        }}
                        onDeleteConversation={(id) => {
                            if (!window.confirm('Delete this conversation?')) return;
                            deleteConversation(id);
                            const files = listConversations();
                            setConversations(files.map(f => ({ id: f.id, title: f.title })));
                            if (selectedConversationId === id) {
                                if (files.length > 0) {
                                    setSelectedConversationId(files[0].id);
                                    setCurrentContent({ conversation_id: files[0].id, content: files[0].content as ConversationItem[] });
                                } else {
                                    setSelectedConversationId(undefined);
                                    setCurrentContent(null);
                                }
                            }
                        }}
                    />
                </Box>

                {/* Center column */}
                <Box sx={{ ...centerPanelSx }}>
                    <CenterPanel
                        conversation={currentContent}
                        contentLoading={false}
                        contentError={null}
                        onImportConversation={(data: any) => {
                            try {
                                const items: ConversationItem[] = Array.isArray(data?.content) ? data.content : Array.isArray(data) ? data : [];
                                const normItems = items
                                    .filter((m) => m && typeof m.role === 'string')
                                    .map((m) => ({ role: m.role, content: m.content } as ConversationItem));
                                if (normItems.length === 0) { return; }
                                const id = generateConversationId();
                                const titleFromData = typeof data?.title === 'string' && data.title.trim() ? data.title.trim() : (normItems[0]?.content?.text?.slice(0, 100) || 'Untitled');
                                upsertConversation({ id, title: titleFromData, content: normItems });
                                refreshListAndSelect(id);
                                setHasUnsavedNew(false);
                            } catch (e) {
                                console.warn('Failed to import conversation JSON', e);
                            }
                        }}
                        onSendAsUser={(text: string) => {
                            const existing = currentContent?.content || [];
                            const nextItems = existing.length === 0 ? [{ role: 'user', content: { text } }] : [...existing, { role: 'user', content: { text } }];
                            const id = persistNewIfNeeded(nextItems);
                            appendAndSave(id, nextItems);
                        }}
                        onSendAsAssistant={(text: string) => {
                            const existing = currentContent?.content || [];
                            const nextItems = existing.length === 0 ? [{ role: 'assistant', content: { text } }] : [...existing, { role: 'assistant', content: { text } }];
                            const id = persistNewIfNeeded(nextItems);
                            appendAndSave(id, nextItems);
                        }}
                    />
                </Box>

                {/* Right column */}
                <Box sx={{ ...rightPanelSx, p: 2, overflow: 'hidden', display: 'flex' }}>
                    <RightPanel onMemorize={handleMemorize} onRetrieve={handleRetrieve} />
                </Box>
            </Box>

            {/* Left Drawer (mobile) */}
            <Drawer anchor="left" open={isLeftDrawerOpen} onClose={() => setIsLeftDrawerOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{ display: 'none', zIndex: 10000, '@media (max-width:1200px)': { display: 'block' } }}
            >
                <Box sx={{ width: '80vw', maxWidth: 360, height: '100%', ...panelBaseSx, borderRadius: 0, p: 2, overflow: 'hidden', display: 'flex' }}>
                    <LeftPanel
                        conversations={conversations}
                        selectedId={selectedConversationId}
                        onCreateConversation={() => { setIsLeftDrawerOpen(false); handleCreateConversation(); }}
                        onSelectConversation={(id) => { setIsLeftDrawerOpen(false); handleSelectConversation(id); }}
                    />
                </Box>
            </Drawer>

            {/* Right Drawer (mobile) */}
            <Drawer anchor="right" open={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{ display: 'none', zIndex: 10000, '@media (max-width:1200px)': { display: 'block' } }}
            >
                <Box sx={{ width: '80vw', maxWidth: 360, height: '100%', ...panelBaseSx, borderRadius: 0, p: 2, overflow: 'hidden', display: 'flex' }}>
                    <RightPanel
                        onMemorize={async () => {
                            setIsRightDrawerOpen(false);
                            return handleMemorize();
                        }}
                        onRetrieve={() => { setIsRightDrawerOpen(false); handleRetrieve(); }}
                    />
                </Box>
            </Drawer>
            <RetrieveModal open={isRetrieveModalOpen} onClose={handleCloseRetrieveModal} />
        </Box>
    );
};

export default PlaygroundPage;


