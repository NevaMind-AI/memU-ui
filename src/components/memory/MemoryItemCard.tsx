import { Box, Chip, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import type { MemoryItem } from '../../types/memory'
import ScoreBadge from './ScoreBadge'

const Card = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(255,255,255,0.10)'
    : '1px solid rgba(0,0,0,0.08)',
  padding: theme.spacing(2),
  background: theme.palette.mode === 'dark'
    ? 'rgba(255,255,255,0.02)'
    : 'rgba(0,0,0,0.02)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
}))

interface MemoryItemCardProps {
  memoryItem: MemoryItem
}

const MemoryItemCard: React.FC<MemoryItemCardProps> = ({ memoryItem }) => {
  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Chip size="small" label={memoryItem.memory_type} color="default" sx={{ fontWeight: 600 }} />
          {typeof memoryItem.score === 'number' && (
            <ScoreBadge score={memoryItem.score} sx={{ ml: 1, flexShrink: 0 }} />
          )}
        </Box>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {memoryItem.summary}
        </Typography>
      </Box>
    </Card>
  )
}

export default MemoryItemCard


