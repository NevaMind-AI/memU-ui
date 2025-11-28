import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';

export interface MemoryCategoryListItem {
  name: string;
  count?: number;
}

export interface RightPanelProps {
  categories?: MemoryCategoryListItem[];
  selectedName?: string;
  onSelectCategory?: (name: string) => void;
  onMemorize?: () => void;
  onRetrieve?: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  categories = [],
  selectedName,
  onSelectCategory,
  onMemorize,
  onRetrieve,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
      {/* Category list */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
        {categories.length === 0 ? (
          <Box sx={{ color: 'text.secondary', fontSize: 14, p: 1, width: '100%' }}>No memory categories</Box>
        ) : (
          categories.map((item) => (
            <Box
              key={item.name}
              onClick={() => onSelectCategory?.(item.name)}
              sx={{
                width: '100%',
                px: 2,
                py: 1.25,
                borderRadius: 1.5,
                cursor: 'pointer',
                bgcolor: item.name === selectedName ? 'action.selected' : 'transparent',
                color: item.name === selectedName ? 'text.primary' : 'text.secondary',
                '&:hover': {
                  bgcolor: item.name === selectedName ? 'action.selected' : 'action.hover',
                  color: 'text.primary',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={item.name}
            >
              <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</Box>
              {typeof item.count === 'number' && (
                <Box sx={{ color: 'text.disabled', fontSize: 12 }}>{item.count}</Box>
              )}
            </Box>
          ))
        )}
      </Box>

      {/* Bottom actions */}
      <Box sx={{ pt: 1, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Stack direction="row" spacing={1}>
          <Button
            fullWidth
            onClick={onRetrieve}
            sx={{
              height: 40,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              backgroundColor: (theme) => theme.palette.action.selected,
              color: (theme) => theme.palette.text.primary,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            Retrieve
          </Button>
          <Button
            fullWidth
            onClick={onMemorize}
            sx={{
              height: 40,
              border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
              borderRadius: 1,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.18 : 0.12),
              color: (theme) => theme.palette.primary.main,
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.24 : 0.18),
              },
            }}
          >
            Memorize
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default RightPanel;


