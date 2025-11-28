import React from 'react';
import { alpha } from '@mui/material/styles';
import { Alert, Box, Button, CircularProgress, Stack, Tab, Tabs } from '@mui/material';
import MemoryCard from '../../../components/memory/MemoryCard';
import MemoryItemCard from '../../../components/memory/MemoryItemCard';
import MemoryViewerModal from '../../../components/memory/MemoryViewerModal';
import type { MemorizeResponse, MemoryCategory, MemoryItem } from '../../../types/memory';

type MemoryTab = 'categories' | 'items';

export interface RightPanelProps {
  onMemorize?: () => Promise<MemorizeResponse | null>;
  onRetrieve?: () => void;
}

const tabConfig: Array<{ value: MemoryTab; label: string }> = [
  { value: 'categories', label: 'Categories' },
  { value: 'items', label: 'Items' },
];

const RightPanel: React.FC<RightPanelProps> = ({ onMemorize, onRetrieve }) => {
  const [activeTab, setActiveTab] = React.useState<MemoryTab>('categories');
  const [memorizeResult, setMemorizeResult] = React.useState<MemorizeResponse | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [viewerCategory, setViewerCategory] = React.useState<MemoryCategory | null>(null);

  const categories = React.useMemo<MemoryCategory[]>(() => memorizeResult?.result?.categories ?? [], [memorizeResult]);
  const items = React.useMemo<MemoryItem[]>(() => memorizeResult?.result?.items ?? [], [memorizeResult]);
  const hasData = categories.length > 0 || items.length > 0;

  const handleMemorizeClick = async () => {
    if (!onMemorize || isLoading) { return; }
    setIsLoading(true);
    setError(null);
    try {
      const response = await onMemorize();
      if (!response) {
        setMemorizeResult(null);
        setError('Memorize did not return any data.');
        return;
      }
      setMemorizeResult(response);
      setActiveTab('categories');
    } catch (err) {
      console.error('[RightPanel] Failed to run memorize', err);
      setError('Unable to fetch memories.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmptyState = (message: string) => (
    <Box sx={{ color: 'text.secondary', fontSize: 14, textAlign: 'center', py: 4, px: 2 }}>
      {message}
    </Box>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CircularProgress size={22} />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      );
    }

    if (!memorizeResult) {
      return renderEmptyState('Run Memorize to generate memories.');
    }

    if (activeTab === 'categories') {
      if (categories.length === 0) {
        return renderEmptyState('No categories were returned.');
      }
      return (
        <Stack spacing={1.5}>
          {categories.map((category) => (
            <Box key={category.id}>
              <MemoryCard memoryCategory={category} onClick={(nextCategory) => setViewerCategory(nextCategory)} />
            </Box>
          ))}
        </Stack>
      );
    }

    if (items.length === 0) {
      return renderEmptyState('No memory items were returned.');
    }

    return (
      <Stack spacing={1.5}>
        {items.map((item) => (
          <Box key={item.id}>
            <MemoryItemCard memoryItem={item} />
          </Box>
        ))}
      </Stack>
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
        <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 1 }}>
          {hasData && (
            <Tabs
              value={activeTab}
              onChange={(_event, next) => setActiveTab(next)}
              variant="fullWidth"
              sx={{ minHeight: 40 }}
              TabIndicatorProps={{ sx: { height: 2 } }}
            >
              {tabConfig.map((tab) => (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  label={`${tab.label}${tab.value === 'categories' ? ` (${categories.length})` : ` (${items.length})`}`}
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                />
              ))}
            </Tabs>
          )}
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', width: '100%', pt: hasData ? 1 : 0 }}>
            {renderContent()}
          </Box>
        </Box>

        <Box sx={{ pt: 1.5, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
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
              disabled={!onMemorize || isLoading}
              onClick={handleMemorizeClick}
              sx={{
                height: 40,
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
                borderRadius: 1,
                backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.18 : 0.12),
                color: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.24 : 0.18),
                },
                '&.Mui-disabled': {
                  opacity: 0.6,
                },
              }}
            >
              {isLoading ? 'Memorizing...' : 'Memorize'}
            </Button>
          </Stack>
        </Box>
      </Box>

      <MemoryViewerModal
        open={Boolean(viewerCategory)}
        onClose={() => setViewerCategory(null)}
        memoryCategory={viewerCategory}
      />
    </>
  );
};

export default RightPanel;


