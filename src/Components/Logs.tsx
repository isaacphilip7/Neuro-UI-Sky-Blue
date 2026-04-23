import { Box, Typography, Paper } from "@mui/material";

export function Logs() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Logs
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          p: 1,
          bgcolor: "background.default",
          height: "100%",
        }}
      >
        <Typography
          component="pre"
          sx={{
            m: 0,
            fontFamily: "monospace",
            fontSize: 11,
            color: "text.secondary",
          }}
        >
{`{2026-04-20 07:27:43}: None (Frontend): System Initialized
{2026-04-20 07:27:43}: None (Frontend): Frontend app loaded successfully.`}
        </Typography>
      </Paper>
    </Box>
  );
}
