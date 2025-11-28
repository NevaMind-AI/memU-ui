import { UploadFile } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, Stack, TextField } from '@mui/material';
import { alpha } from '@mui/material/styles';
import React from 'react';

export interface DialogComposerProps {
  onSendAsUser?: (text: string) => void;
  onSendAsAssistant?: (text: string) => void;
  onImportConversation?: (data: any) => void;
}

const DialogComposer: React.FC<DialogComposerProps> = ({ onSendAsUser, onSendAsAssistant, onImportConversation }) => {
  const [text, setText] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      const file = e.target.files?.[0];
      if (!file) { return; }
      const content = await file.text();
      const json = JSON.parse(content);
      onImportConversation?.(json);
    } catch (err) {
      console.error('Failed to import conversation JSON:', err);
    } finally {
      if (e.target) { e.target.value = ''; }
    }
  };

  const handleSendAsUser = () => {
    const value = text.trim();
    if (!value) { return; }
    onSendAsUser?.(value);
    setText('');
  };

  const handleSendAsAssistant = () => {
    const value = text.trim();
    if (!value) { return; }
    onSendAsAssistant?.(value);
    setText('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        p: 2,
      }}
    >
      {/* Editor */}
      <TextField
        fullWidth
        multiline
        minRows={3}
        maxRows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        slotProps={{
          input: {
            style: {
            },
          },
        }}
        sx={{
          mb: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': { border: 'none' },
            '&:hover fieldset': { border: 'none' },
            '&.Mui-focused fieldset': { border: 'none' },
          },
        }}
      />

      <Divider sx={{ mb: 1 }} />

      {/* Bottom bar: left tools + right actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 0 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            size="small"
            color="inherit"
            aria-label="import conversation json"
            title="Import conversation JSON"
            onClick={handleImportClick}
            sx={{ border: (theme) => `1px solid ${theme.palette.divider}`, borderRadius: 1, height: 40, width: 40 }}
          >
            <UploadFile fontSize="small" />
          </IconButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            size="small"
            aria-label="send as assistant"
            onClick={handleSendAsAssistant}
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
            Send as Assistant
          </Button>
          <Button
            size="small"
            aria-label="send as user"
            onClick={handleSendAsUser}
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
            Send as User
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default DialogComposer;


