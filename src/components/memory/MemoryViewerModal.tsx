import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Box,
    Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { MemoryCategory } from '../../types/memory'

const StyledDialog = styled(Dialog)(({ theme }) => ({
    zIndex: 20000,
    '& .MuiDialog-paper': {
        borderRadius: 16,
        minWidth: 300,
        maxWidth: 1000,
        maxHeight: '90vh',
        margin: theme.spacing(2),
    },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
    '&:first-of-type': {
        paddingTop: theme.spacing(3),
    },
}))

const MarkdownContainer = styled(Box)(({ theme }) => ({
    '& h1': {
        fontSize: '2rem',
        fontWeight: 600,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(3),
        color: theme.palette.text.primary,
        '&:first-of-type': {
            marginTop: 0,
        },
    },
    '& h2': {
        fontSize: '1.5rem',
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
        marginTop: theme.spacing(2.5),
        color: theme.palette.text.primary,
    },
    '& h3': {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
        color: theme.palette.text.primary,
    },
    '& h4': {
        fontSize: '1.1rem',
        fontWeight: 600,
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1.5),
        color: theme.palette.text.primary,
    },
    '& p': {
        marginBottom: theme.spacing(2),
        lineHeight: 1.6,
        color: theme.palette.text.primary,
    },
    '& ul, & ol': {
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        '& li': {
            marginBottom: theme.spacing(0.5),
            color: theme.palette.text.primary,
        },
    },
    '& blockquote': {
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        paddingLeft: theme.spacing(2),
        marginLeft: 0,
        marginBottom: theme.spacing(2),
        fontStyle: 'italic',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.02)',
        padding: theme.spacing(2),
        borderRadius: 4,
    },
    '& code': {
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.08)',
        padding: theme.spacing(0.25, 0.5),
        borderRadius: 4,
        fontSize: '0.875rem',
        fontFamily: '"Fira Code", Consolas, monospace',
        color: theme.palette.text.primary,
    },
    '& pre': {
        backgroundColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.05)',
        padding: theme.spacing(2),
        borderRadius: 8,
        overflow: 'auto',
        marginBottom: theme.spacing(2),
        border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
        '& code': {
            backgroundColor: 'transparent',
            padding: 0,
            fontSize: '0.875rem',
            fontFamily: '"Fira Code", Consolas, monospace',
        },
    },
    '& table': {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: theme.spacing(2),
        '& th, & td': {
            padding: theme.spacing(1),
            textAlign: 'left',
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        '& th': {
            fontWeight: 600,
            backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
        },
    },
    '& hr': {
        border: 'none',
        height: '1px',
        backgroundColor: theme.palette.divider,
        margin: theme.spacing(3, 0),
    },
    '& strong': {
        fontWeight: 600,
    },
    '& em': {
        fontStyle: 'italic',
    },
}))

const CloseButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}))

interface MemoryViewerModalProps {
    open: boolean
    onClose: () => void
    memoryCategory: MemoryCategory | null
}

const MemoryViewerModal: React.FC<MemoryViewerModalProps> = ({
    open,
    onClose,
    memoryCategory,
}) => {
    if (!memoryCategory) return null

    const formatContentSize = (content: string | null) => {
        if (!content) return '0 KB'
        const bytes = new TextEncoder().encode(content).length
        const kb = bytes / 1024
        return `${kb.toFixed(1)} KB`
    }

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            maxWidth={false}
            scroll="body"
        >
            <StyledDialogTitle>
                <Box>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        {memoryCategory.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {formatContentSize(memoryCategory.summary)}
                    </Typography>
                </Box>
                <CloseButton onClick={onClose} size="small">
                    <Close />
                </CloseButton>
            </StyledDialogTitle>
            
            <StyledDialogContent>
                <MarkdownContainer>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <Typography variant="h4" component="h1" sx={{ mb: 2, mt: 3, fontWeight: 600 }}>
                                    {children}
                                </Typography>
                            ),
                            h2: ({ children }) => (
                                <Typography variant="h5" component="h2" sx={{ mb: 1.5, mt: 2.5, fontWeight: 600 }}>
                                    {children}
                                </Typography>
                            ),
                            h3: ({ children }) => (
                                <Typography variant="h6" component="h3" sx={{ mb: 1, mt: 2, fontWeight: 600 }}>
                                    {children}
                                </Typography>
                            ),
                        }}
                    >
                        {memoryCategory.summary || ''}
                    </ReactMarkdown>
                </MarkdownContainer>
            </StyledDialogContent>
        </StyledDialog>
    )
}

export default MemoryViewerModal


