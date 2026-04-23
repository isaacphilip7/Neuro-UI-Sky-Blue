import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export function ThemeToggle({ mode, setMode }: { mode: string; setMode: (m: string) => void }) {
  return (
    <IconButton
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      sx={{ color: "white" }}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
