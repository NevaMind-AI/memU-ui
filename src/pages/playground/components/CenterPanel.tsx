import React from 'react';
import { Box } from '@mui/material';
import DialogComposer, { type DialogComposerProps } from './DialogComposer';
import ConversationDisplay from '../../../components/conversation/ConversationDisplay';
import type { ConversationContent } from '../../../types/conversation';

export interface CenterPanelProps extends DialogComposerProps {
  conversationContent?: ConversationContent | null;
  contentLoading?: boolean;
  contentError?: string | null;
}

const CenterPanel: React.FC<CenterPanelProps> = (props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* conversation list area */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <ConversationDisplay
          header={null}
          conversationContent={props.conversationContent}
          contentLoading={props.contentLoading}
          contentError={props.contentError}
          emptyTitle="No conversation"
          emptyDescription="Input message or import conversation from JSON file to begin."
          messagesPadding={1}
        />
      </Box>
      <DialogComposer
        onSendAsUser={props.onSendAsUser}
        onSendAsAssistant={props.onSendAsAssistant}
        onImportConversation={props.onImportConversation}
      />
    </Box>
  );
};

export default CenterPanel;


