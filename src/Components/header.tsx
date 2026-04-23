import { Box, Button, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function Header() {
  return (
    <Box
      sx={{
        height: 56,
        bgcolor: "primary.main",
        color: "white",
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        Neuro AI – Multi Agent Accelerator Client
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button variant="contained" color="secondary">Reload</Button>
        <Button variant="contained" color="secondary">Home</Button>
        <Button variant="contained" color="secondary">New</Button>

        <IconButton sx={{ color: "white" }}>
          <SettingsIcon />
        </IconButton>

        <IconButton sx={{ color: "white" }}>
          <AccountCircleIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
