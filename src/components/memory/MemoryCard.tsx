import {
    Description,
    Storage
} from '@mui/icons-material'
import {
    Box,
    Card,
    CardContent,
    Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import type { MemoryCategory } from '../../types/memory'
import ScoreBadge from './ScoreBadge'

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: 12,
    border: theme.palette.mode === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.08)'
        : '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    '&:hover': {
        borderColor: theme.palette.primary.main,
        boxShadow: 'none',
    },
}))

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
}))

const InfoRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    marginTop: theme.spacing(1),
    '& .MuiSvgIcon-root': {
        fontSize: '1rem',
        color: theme.palette.text.secondary,
        flexShrink: 0,
    },
}))

interface MemoryCardProps {
    memoryCategory: MemoryCategory
    onClick: (memoryCategory: MemoryCategory) => void
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memoryCategory, onClick }) => {
    const formatSize = (bytes: number) => {
        const kb = bytes / 1024
        return `${kb.toFixed(1)} KB`
    }


    const handleClick = () => {
        onClick(memoryCategory)
    }

    return (
        <StyledCard onClick={handleClick}>
            <StyledCardContent>
                <Box 
                    sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        mb: 1,
                        minHeight: 32
                    }}
                >
                    <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                            fontWeight: 600, 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {memoryCategory.name}
                    </Typography>
                    {typeof memoryCategory.score === 'number' && (
                        <ScoreBadge score={memoryCategory.score} sx={{ flexShrink: 0 }} />
                    )}
                </Box>

                <Box>
                    <InfoRow>
                        <Description />
                        <Typography variant="caption" color="text.disabled" sx={{ minWidth: 60 }}>
                            Desc:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {memoryCategory.description}
                        </Typography>
                    </InfoRow>

                    <InfoRow>
                        <Storage />
                        <Typography variant="caption" color="text.disabled" sx={{ minWidth: 60 }}>
                            Size:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formatSize(memoryCategory.summary.length)}
                        </Typography>
                    </InfoRow>
                </Box>
            </StyledCardContent>
        </StyledCard>
    )
}

export default MemoryCard



