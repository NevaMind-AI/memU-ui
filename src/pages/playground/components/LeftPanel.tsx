import React from 'react';
import { Box, Button, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { MoreVert, DriveFileRenameOutline, DeleteOutline } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

export interface ConversationListItem {
  id: string;
  title: string;
}

export interface LeftPanelProps {
  conversations?: ConversationListItem[];
  selectedId?: string;
  onSelectConversation?: (id: string) => void;
  onCreateConversation?: () => void;
  onRenameConversation?: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  conversations = [],
  selectedId,
  onSelectConversation,
  onCreateConversation,
  onRenameConversation,
  onDeleteConversation,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuTargetId, setMenuTargetId] = React.useState<string | null>(null);

  const openMenu = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.stopPropagation();
    setMenuAnchorEl(e.currentTarget);
    setMenuTargetId(id);
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
    setMenuTargetId(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
      {/* Conversations list */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
        {conversations.length === 0 ? (
          <Box sx={{ color: 'text.secondary', fontSize: 14, p: 1, width: '100%' }}>No conversations</Box>
        ) : (
          conversations.map((item) => (
            <Box
              key={item.id}
              onClick={() => onSelectConversation?.(item.id)}
              sx={{
                width: '100%',
                px: 2,
                py: 1.25,
                borderRadius: 1.5,
                cursor: 'pointer',
                bgcolor: item.id === selectedId ? 'action.selected' : 'transparent',
                color: item.id === selectedId ? 'text.primary' : 'text.secondary',
                '&:hover': {
                  bgcolor: item.id === selectedId ? 'action.selected' : 'action.hover',
                  color: 'text.primary',
                },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              title={item.title}
            >
              <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</Box>
              <IconButton
                size="small"
                onClick={(e) => openMenu(e, item.id)}
                sx={{ ml: 1 }}
              >
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
          ))
        )}
      </Box>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            if (menuTargetId) onRenameConversation?.(menuTargetId);
            closeMenu();
          }}
        >
          <ListItemIcon><DriveFileRenameOutline fontSize="small" /></ListItemIcon>
          <ListItemText primary="Rename" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (menuTargetId) onDeleteConversation?.(menuTargetId);
            closeMenu();
          }}
        >
          <ListItemIcon><DeleteOutline fontSize="small" /></ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {/* Bottom action */}
      <Box sx={{ pt: 1.5, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Button
          fullWidth
          onClick={onCreateConversation}
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
          New Conversation
        </Button>
      </Box>
    </Box>
  );
};

export default LeftPanel;


