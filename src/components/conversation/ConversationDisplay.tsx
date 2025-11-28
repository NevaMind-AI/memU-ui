import React from 'react'
import {
    Box,
    Typography,
    Paper,
    CircularProgress,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Conversation } from '../../types/conversation'

const ConversationContainer = styled(Box)(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}))

const MessagesContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
    padding: theme.spacing(3),
    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)',
        borderRadius: '2px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.3)'
            : 'rgba(0, 0, 0, 0.3)',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.2) transparent'
        : 'rgba(0, 0, 0, 0.2) transparent',
}))

const UserMessageBubble = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1.5),
    maxWidth: '80%',
    backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.05)',
    color: theme.palette.text.primary,
    borderRadius: '20px 20px 4px 20px',
    position: 'relative',
    wordBreak: 'break-word',
    boxShadow: 'none',
    border: `1px solid ${theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)'}`,
}))

const UserMessageContainer = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
}))

const AgentMessageContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(1.5),
    wordBreak: 'break-word',
}))

const MarkdownContainer = styled(Box)(({ theme }) => ({
    '& h1': {
        fontSize: '1.5rem',
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
        marginTop: theme.spacing(2),
        color: theme.palette.text.primary,
        '&:first-of-type': {
            marginTop: 0,
        },
    },
    '& h2': {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1.5),
        color: theme.palette.text.primary,
    },
    '& h3': {
        fontSize: '1.1rem',
        fontWeight: 600,
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(1),
        color: theme.palette.text.primary,
    },
    '& h4, & h5, & h6': {
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: theme.spacing(0.5),
        marginTop: theme.spacing(1),
        color: theme.palette.text.primary,
    },
    '& p': {
        marginBottom: theme.spacing(1),
        lineHeight: 1.4,
        color: theme.palette.text.primary,
    },
    '& ul, & ol': {
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        '& li': {
            marginBottom: theme.spacing(0.25),
            color: theme.palette.text.primary,
        },
    },
    '& blockquote': {
        borderLeft: `3px solid ${theme.palette.primary.main}`,
        paddingLeft: theme.spacing(1.5),
        marginLeft: 0,
        marginBottom: theme.spacing(1),
        fontStyle: 'italic',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.02)',
        padding: theme.spacing(1),
        borderRadius: 4,
    },
    '& code': {
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        padding: '2px 4px',
        borderRadius: 4,
        fontSize: '0.85rem',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    },
    '& pre': {
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        padding: theme.spacing(1.5),
        borderRadius: 6,
        overflow: 'auto',
        fontSize: '0.85rem',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        margin: theme.spacing(1, 0),
        '& code': {
            backgroundColor: 'transparent',
            padding: 0,
        },
    },
    '& table': {
        borderCollapse: 'collapse',
        width: '100%',
        marginBottom: theme.spacing(1),
        '& th, & td': {
            border: `1px solid ${theme.palette.divider}`,
            padding: theme.spacing(0.5, 1),
            textAlign: 'left',
        },
        '& th': {
            backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            fontWeight: 600,
        },
    },
}))

const MessageContent = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    lineHeight: 1.4,
    whiteSpace: 'pre-wrap',
    '& code': {
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        padding: '2px 4px',
        borderRadius: 4,
        fontSize: '0.85rem',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
    },
    '& pre': {
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        padding: theme.spacing(1),
        borderRadius: 4,
        overflow: 'auto',
        fontSize: '0.85rem',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        margin: theme.spacing(0.5, 0),
    },
}))

interface ConversationDisplayProps {
    header?: React.ReactNode
    conversation?: Conversation | null
    contentLoading?: boolean
    contentError?: string | null
    emptyTitle?: string
    emptyDescription?: string
    messagesPadding?: number | string
}

const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
    header,
    conversation,
    contentLoading,
    contentError,
    emptyTitle,
    emptyDescription,
    messagesPadding,
}) => {
    const messagesContainerRef = React.useRef<HTMLDivElement | null>(null)
    const conversationId = conversation?.conversation_id
    const messageCount = conversation?.content?.length ?? 0

    React.useEffect(() => {
        if (!messagesContainerRef.current) { return }
        messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth',
        })
    }, [conversationId, messageCount])

    return (
        <ConversationContainer>
            {header}
            <MessagesContainer
                ref={messagesContainerRef}
                sx={messagesPadding !== undefined ? { padding: messagesPadding } : undefined}
            >
                {contentLoading ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        gap: 2
                    }}>
                        <CircularProgress size={24} />
                        <Typography variant="body2" color="text.secondary">
                            Loading conversation content...
                        </Typography>
                    </Box>
                ) : contentError ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        gap: 2
                    }}>
                        <Typography variant="body1" color="error">
                            Error: {contentError}
                        </Typography>
                    </Box>
                ) : conversation && conversation.content ? (
                    conversation.content.map((message, index) => (
                        <Box key={`${conversation.conversation_id}-${index}`}>
                            {message.role === 'user' ? (
                                <UserMessageContainer>
                                    <UserMessageBubble>
                                        <MessageContent>
                                            {message.content.text}
                                        </MessageContent>
                                    </UserMessageBubble>
                                </UserMessageContainer>
                            ) : (
                                <AgentMessageContainer>
                                    <MarkdownContainer>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {message.content.text}
                                        </ReactMarkdown>
                                    </MarkdownContainer>
                                </AgentMessageContainer>
                            )}
                        </Box>
                    ))
                ) : (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        gap: 2
                    }}>
                        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
                            {emptyTitle || 'Select a Conversation'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 400 }}>
                            {emptyDescription || 'Use the controls to select or create a conversation to view its messages.'}
                        </Typography>
                    </Box>
                )}
            </MessagesContainer>
        </ConversationContainer>
    )
}

export default ConversationDisplay


