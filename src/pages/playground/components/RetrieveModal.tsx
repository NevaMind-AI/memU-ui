import React from 'react';
import { Close } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MemoryCard from '../../../components/memory/MemoryCard';
import MemoryItemCard from '../../../components/memory/MemoryItemCard';
import MemoryViewerModal from '../../../components/memory/MemoryViewerModal';
import type { MemoryCategory, MemoryItem, RetrieveResponse } from '../../../types/memory';
import { retrieve } from '../client';

interface RetrieveModalProps {
  open: boolean;
  onClose: () => void;
}

const horizontalListSx = {
  display: 'flex',
  gap: 1.5,
  overflowX: 'auto' as const,
  pb: 0.5,
};

const RetrieveModal: React.FC<RetrieveModalProps> = ({ open, onClose }) => {
  const [query, setQuery] = React.useState('');
  const [queryError, setQueryError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<RetrieveResponse | null>(null);
  const [viewerCategory, setViewerCategory] = React.useState<MemoryCategory | null>(null);

  const categories = React.useMemo<MemoryCategory[]>(() => result?.result?.categories ?? [], [result]);
  const items = React.useMemo<MemoryItem[]>(() => result?.result?.items ?? [], [result]);
  const formattedJson = React.useMemo(
    () => (result ? JSON.stringify(result, null, 2) : 'Results will appear here after retrieval runs.'),
    [result]
  );

  const executeRetrieve = React.useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setQueryError('Query is required.');
      return;
    }
    setQueryError(null);
    setIsLoading(true);
    setError(null);
    try {
      const response = await retrieve(trimmed);
      if (!response) {
        setResult(null);
        setError('Retrieve did not return any data.');
        return;
      }
      setResult(response);
    } catch (err) {
      console.error('[RetrieveModal] Failed to retrieve memories', err);
      setError('Unable to retrieve memories.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (isLoading) { return; }
    void executeRetrieve();
  };

  React.useEffect(() => {
    if (!open) {
      setQuery('');
      setResult(null);
      setError(null);
      setQueryError(null);
      setIsLoading(false);
      setViewerCategory(null);
    }
  }, [open]);

  const renderStatusState = (title: string, description?: string, content?: React.ReactNode) => (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 1,
        color: 'text.secondary',
        py: 4,
      }}
    >
      {content}
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );

  const renderContentArea = () => {
    if (isLoading) {
      return renderStatusState('Retrieving memories...', 'This may take a few seconds.', <CircularProgress size={22} />);
    }

    if (error) {
      return (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Box sx={{ maxWidth: 360 }}>
            <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>
            <Typography variant="body2" color="text.secondary">
              Update your query and try again.
            </Typography>
          </Box>
        </Box>
      );
    }

    if (!result) {
      return renderStatusState('No retrieval yet', 'Run Start Retrieve to populate this area.');
    }

    return (
      <Stack spacing={2} sx={{ flex: 1 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Memory Categories
          </Typography>
          {categories.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No categories yet.
            </Typography>
          ) : (
            <Box sx={horizontalListSx}>
              {categories.map((category) => (
                <Box key={category.id} sx={{ minWidth: '300px' }}>
                  <MemoryCard memoryCategory={category} onClick={setViewerCategory} />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Memory Items
          </Typography>
          {items.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No memory items yet.
            </Typography>
          ) : (
            <Box sx={horizontalListSx}>
              {items.map((item) => (
                <Box key={item.id} sx={{ minWidth: 260 }}>
                  <MemoryItemCard memoryItem={item} />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Raw Response
          </Typography>
          <Box
            sx={{
              maxHeight: 220,
              borderRadius: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              bgcolor: (theme) => theme.palette.background.paper,
              overflow: 'auto',
              p: 1.5,
            }}
          >
            <Box
              component="pre"
              sx={{
                m: 0,
                fontFamily: '"Fira Code", Consolas, monospace',
                fontSize: 13,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {formattedJson}
            </Box>
          </Box>
        </Box>
      </Stack>
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { width: 'min(92vw, 720px)', maxHeight: '90vh' } }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'contents' }}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 1 }}>
            <Typography variant="h6" component="div">
              Retrieve memories
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Close fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: 0, pb: 2, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Box sx={{ p: 3, pb: 2, display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minHeight: 0 }}>
              <TextField
                label="Query"
                placeholder="Describe what you want to retrieve..."
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  if (queryError) { setQueryError(null); }
                }}
                multiline
                minRows={2}
                maxRows={2}
                fullWidth
                error={Boolean(queryError)}
                helperText={queryError || 'e.g: What is user\'s cat\'s name?'}
              />

              <Box
                sx={{
                  flex: 1,
                  minHeight: 0,
                  borderRadius: 2,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
                  {renderContentArea()}
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              px: 3,
              pb: 3,
              pt: 2,
              justifyContent: 'stretch',
            }}
          >
            <Button
              type="submit"
              disabled={isLoading || query.trim().length === 0}
              sx={{
                width: '100%',
                height: 48,
                borderRadius: 1.5,
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.35)}`,
                backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.18 : 0.12),
                color: (theme) => theme.palette.primary.main,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.24 : 0.18),
                },
                '&.Mui-disabled': {
                  opacity: 0.65,
                },
              }}
            >
              {isLoading ? 'Retrieving...' : 'Start Retrieve'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <MemoryViewerModal
        open={Boolean(viewerCategory)}
        onClose={() => setViewerCategory(null)}
        memoryCategory={viewerCategory}
      />
    </>
  );
};

export default RetrieveModal;

