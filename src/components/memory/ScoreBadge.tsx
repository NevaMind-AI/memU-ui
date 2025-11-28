import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface ScoreBadgeProps extends Omit<BoxProps, 'children'> {
  score: number;
  label?: string;
}

const Badge = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.25, 1.25),
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 1.4,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(0,0,0,0.06)',
}));

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score, label = 'Score', ...rest }) => (
  <Badge {...rest}>
    {label} {score.toFixed(2)}
  </Badge>
);

export default ScoreBadge;

