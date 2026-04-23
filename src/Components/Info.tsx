import { Box, Typography } from "@mui/material";

export function Info() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Sustainability Score
      </Typography>

      <Typography variant="body2" sx={{ fontSize: 13 }}>Energy: 0.00 kWh</Typography>
      <Typography variant="body2" sx={{ fontSize: 13 }}>Carbon: 0.00 g CO2</Typography>
      <Typography variant="body2" sx={{ fontSize: 13 }}>Water: 0.00 Litre</Typography>
      <Typography variant="body2" sx={{ fontSize: 13, mb: 2 }}>Cost: $0.00</Typography>

      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Resources
      </Typography>

      <Typography variant="body2" sx={{ fontSize: 13 }}>NeuroSan v0.5.23</Typography>
      <Typography variant="body2" sx={{ fontSize: 13 }}>Client v0.5.10</Typography>
      <Typography variant="body2" sx={{ fontSize: 13 }}>Documentation</Typography>
    </Box>
  );
}
