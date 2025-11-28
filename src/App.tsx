import React from 'react'
import { Link as RouterLink, Route, Routes } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import PlaygroundPage from './pages/playground/PlaygroundPage'

const SettingsPlaceholder: React.FC = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      p: 4,
      textAlign: 'center',
    }}
  >
    <Stack spacing={1}>
      <Typography variant="h4" fontWeight={600}>
        Settings Placeholder
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is a placeholder for the settings page.
      </Typography>
    </Stack>
    <Button
      component={RouterLink}
      to="/"
      variant="contained"
      sx={{ mt: 2 }}
    >
      Back to Playground
    </Button>
  </Box>
)

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<PlaygroundPage />} />
    <Route path="/settings" element={<SettingsPlaceholder />} />
    <Route path="*" element={<PlaygroundPage />} />
  </Routes>
)

export default App

