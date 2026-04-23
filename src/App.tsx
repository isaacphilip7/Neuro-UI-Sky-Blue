import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  Button,
  Tabs,
  Tab,
  IconButton,
  Paper,
  InputAdornment,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AutoFixHigh,
  RestartAlt,
  Hub,
  AttachFile,
  Mic,
  Search,
  KeyboardArrowUp,
  KeyboardArrowDown,
  GetApp,
  BoltOutlined,
  Co2,
  WaterDrop,
  AttachMoney,
  PlayArrow,
  Pause,
  FiberManualRecord,
  DeleteOutlined,
  InfoOutlined,
  MenuBook,
  Brightness4,
  AccountCircle,
} from "@mui/icons-material";

/* ─────────────────────────────────────────────────────────
   DESIGN TOKENS — single source of truth for all styling
───────────────────────────────────────────────────────── */
const TOKENS = {
  // Colors
  colorPrimary: "#0051FF",
  colorPrimaryHover: "#0040CC",
  colorHeaderBg: "#1A2BE0",
  colorHeaderText: "#FFFFFF",
  // Border
  borderWidth: "1px",
  // Font sizes (px numbers used in sx fontSize)
  fontSizeXs: 11,
  fontSizeSm: 12,
  fontSizeMd: 13,
  fontSizeLg: 14,
  fontSizeTitle: 15,
  // Border radii
  radiusSm: "6px",
  radiusMd: "8px",
  radiusLg: "12px",
};

/* ─────────────────────────────────────────────────────────
   THEME FACTORY — builds light or dark MUI theme
───────────────────────────────────────────────────────── */
function buildTheme(mode: "light" | "dark") {
  return createTheme({
    palette: {
      mode,
      primary: { main: TOKENS.colorPrimary },
      background: {
        default: mode === "dark" ? "#05060a" : "#eef1f8",
        paper:   mode === "dark" ? "#0e1117" : "#ffffff",
      },
      divider: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.10)",
      text: {
        primary:   mode === "dark" ? "#e8eaf0" : "#0d1117",
        secondary: mode === "dark" ? "#6b7280" : "#6b7280",
      },
    },
    typography: {
      fontFamily: "'Nunito', 'Helvetica Neue', sans-serif",
      fontSize: TOKENS.fontSizeMd,
    },
    shape: { borderRadius: 8 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            fontSize: TOKENS.fontSizeSm,
          },
          outlined: {
            borderWidth: TOKENS.borderWidth,
            "&:hover": { borderWidth: TOKENS.borderWidth },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontSize: TOKENS.fontSizeXs,
            minHeight: 36,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": { fontSize: TOKENS.fontSizeMd },
          },
        },
      },
    },
  });
}

/* ─────────────────────────────────────────────────────────
   HEADER
───────────────────────────────────────────────────────── */
interface HeaderProps {
  mode: "light" | "dark";
  onToggleMode: () => void;
}

function Header({ mode, onToggleMode }: HeaderProps) {
  return (
    <Box
      sx={{
        bgcolor: TOKENS.colorHeaderBg,
        color: TOKENS.colorHeaderText,
        px: 2.5,
        py: 0.75,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        borderBottom: `${TOKENS.borderWidth} solid rgba(255,255,255,0.12)`,
      }}
    >
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: TOKENS.fontSizeLg,
          letterSpacing: "-0.02em",
          color: TOKENS.colorHeaderText,
        }}
      >
        Neuro AI{" "}
        <Box component="span" sx={{ fontWeight: 400, opacity: 0.85 }}>
          - Multi Agent Accelerator Client
        </Box>
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          sx={{
            color: "#fff",
            borderColor: "rgba(255,255,255,0.45)",
            fontSize: TOKENS.fontSizeSm,
            "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.08)" },
          }}
        >
          Reload
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            bgcolor: "#fff",
            color: TOKENS.colorPrimary,
            fontSize: TOKENS.fontSizeSm,
            "&:hover": { bgcolor: "rgba(255,255,255,0.88)" },
          }}
        >
          Home
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            bgcolor: "rgba(255,255,255,0.18)",
            color: "#fff",
            fontSize: TOKENS.fontSizeSm,
            "&:hover": { bgcolor: "rgba(255,255,255,0.28)" },
          }}
        >
          New
        </Button>

        {/* Theme toggle */}
        <IconButton
          size="small"
          onClick={onToggleMode}
          sx={{ color: "#fff", ml: 0.5 }}
          title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Brightness4 fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: "#fff" }}>
          <AccountCircle fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────────────────── */
const AGENTS = [
  "airline_policy",
  "advanced_calendar",
  "smart_home",
  "smart_home_onf",
  "agent_network_designer",
  "agent_network_gen",
  "music_nerd",
  "music_nerd_local",
  "music_nerd_pro",
  "music_nerd_pro_sly",
];

// Two agents pre-selected by default
const DEFAULT_SELECTED = new Set(["agent_network_designer", "smart_home"]);

function Sidebar() {
  const [port, setPort] = useState(8080);
  const [selected, setSelected] = useState<Set<string>>(new Set(DEFAULT_SELECTED));
  const [search, setSearch] = useState("");

  const toggleAgent = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const filtered = AGENTS.filter((a) => a.includes(search.toLowerCase()));

  return (
    <Box
      sx={{
        width: "100%",
        p: 1.5,
        borderRight: `${TOKENS.borderWidth} solid`,
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 1.25,
        overflow: "hidden",
      }}
    >
      {/* Section: Agent Network config */}
      <Typography sx={{ fontWeight: 700, fontSize: TOKENS.fontSizeTitle }}>
        Agent Network
      </Typography>

      <Box>
        <Typography variant="caption" sx={{ color: "text.secondary", fontSize: TOKENS.fontSizeXs }}>
          Protocol
        </Typography>
        <RadioGroup row defaultValue="http" sx={{ mt: 0.25 }}>
          <FormControlLabel
            value="http"
            control={<Radio size="small" sx={{ p: 0.5 }} />}
            label={<Typography sx={{ fontSize: TOKENS.fontSizeSm }}>http</Typography>}
          />
          <FormControlLabel
            value="https"
            control={<Radio size="small" sx={{ p: 0.5 }} />}
            label={<Typography sx={{ fontSize: TOKENS.fontSizeSm }}>https</Typography>}
          />
        </RadioGroup>
      </Box>

      <Box>
        <Typography variant="caption" sx={{ color: "text.secondary", fontSize: TOKENS.fontSizeXs }}>
          Host
        </Typography>
        <TextField size="small" fullWidth defaultValue="localhost" sx={{ mt: 0.5 }} />
      </Box>

      {/* Port field with up/down spinner arrows */}
      <Box>
        <Typography variant="caption" sx={{ color: "text.secondary", fontSize: TOKENS.fontSizeXs }}>
          Port
        </Typography>
        <TextField
          size="small"
          fullWidth
          value={port}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v)) setPort(v);
          }}
          sx={{ mt: 0.5 }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end" sx={{ mr: -0.5 }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <IconButton
                      size="small"
                      tabIndex={-1}
                      sx={{ p: 0, height: 14 }}
                      onClick={() => setPort((p) => p + 1)}
                    >
                      <KeyboardArrowUp sx={{ fontSize: 14 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      tabIndex={-1}
                      sx={{ p: 0, height: 14 }}
                      onClick={() => setPort((p) => Math.max(0, p - 1))}
                    >
                      <KeyboardArrowDown sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Connect button — directly below Port */}
      <Button
        variant="contained"
        size="small"
        fullWidth
        sx={{
          bgcolor: TOKENS.colorPrimary,
          fontSize: TOKENS.fontSizeSm,
          "&:hover": { bgcolor: TOKENS.colorPrimaryHover },
        }}
      >
        Connect
      </Button>

      {/* Available Agents section */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: TOKENS.fontSizeTitle, mb: 0.75 }}>
          Available Agents
        </Typography>

        <TextField
          size="small"
          fullWidth
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 0.75 }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ fontSize: 16, color: "text.secondary" }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ flex: 1, overflow: "auto", minHeight: 0 }}>
          <List dense disablePadding>
            {filtered.map((agent) => {
              const isSelected = selected.has(agent);
              return (
                <ListItem
                  key={agent}
                  onClick={() => toggleAgent(agent)}
                  sx={{
                    py: 0.6,
                    px: 1.25,
                    mb: 0.4,
                    borderRadius: TOKENS.radiusSm,
                    cursor: "pointer",
                    border: `${TOKENS.borderWidth} solid`,
                    borderColor: isSelected ? TOKENS.colorPrimary : "divider",
                    bgcolor: isSelected ? TOKENS.colorPrimary : "transparent",
                    color: isSelected ? "#fff" : "text.primary",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      bgcolor: isSelected ? TOKENS.colorPrimaryHover : "action.hover",
                    },
                    display: "block",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: TOKENS.fontSizeMd,
                      color: "inherit",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {agent}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────
   CANVAS (middle top)
───────────────────────────────────────────────────────── */
function Canvas() {
  return (
    <Box
      sx={{
        flex: 1,
        position: "relative",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        borderBottom: `${TOKENS.borderWidth} solid`,
        borderColor: "divider",
        minHeight: 0,
      }}
    >
      <Box
        sx={{
          p: 1,
          borderBottom: `${TOKENS.borderWidth} solid`,
          borderColor: "divider",
          display: "flex",
          gap: 1,
          flexShrink: 0,
        }}
      >
        <Button size="small" variant="outlined" startIcon={<AutoFixHigh />} sx={{ fontSize: TOKENS.fontSizeXs }}>
          Auto Arrange
        </Button>
        <Button size="small" variant="outlined" startIcon={<RestartAlt />} sx={{ fontSize: TOKENS.fontSizeXs }}>
          Reset
        </Button>
      </Box>

      <Box sx={{ position: "relative", flex: 1 }}>
        <Box sx={{ position: "absolute", top: 70, left: 130 }}>
          <Paper
            variant="outlined"
            sx={{
              px: 2,
              py: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: TOKENS.colorPrimary,
              borderColor: TOKENS.colorPrimary,
              borderRadius: TOKENS.radiusMd,
            }}
          >
            <Hub fontSize="small" sx={{ color: "#fff" }} />
            <Typography sx={{ fontWeight: 600, fontSize: TOKENS.fontSizeMd, color: "#fff" }}>
              agent_network_designer
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────
   LOGS (middle bottom left) — with Download button
───────────────────────────────────────────────────────── */
function Logs() {
  const handleDownload = () => {
    const text = `{2026-04-20 07:27:43}: None (Frontend): System Initialized\n{2026-04-20 07:27:43}: None (Frontend): Frontend app loaded successfully.`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "logs.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.75, flexShrink: 0 }}>
        <Typography sx={{ fontWeight: 700, fontSize: TOKENS.fontSizeTitle }}>Logs</Typography>
        <IconButton size="small" onClick={handleDownload} title="Download logs">
          <GetApp sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      <Paper
        variant="outlined"
        sx={{
          p: 1,
          bgcolor: "background.default",
          flex: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Typography
          component="pre"
          sx={{
            m: 0,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: TOKENS.fontSizeXs,
            color: "text.secondary",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {`{2026-04-20 07:27:43}: None (Frontend): System Initialized\n{2026-04-20 07:27:43}: None (Frontend): Frontend app loaded successfully.`}
        </Typography>
      </Paper>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────
   INFO (middle bottom right) — with icons for each metric
───────────────────────────────────────────────────────── */
const SUSTAINABILITY = [
  {
    icon: <BoltOutlined sx={{ fontSize: 15, color: "#f59e0b" }} />,
    label: "Energy",
    value: "0.00",
    unit: "kWh",
  },
  {
    icon: <Co2 sx={{ fontSize: 15, color: "#10b981" }} />,
    label: "Carbon",
    value: "0.00 g",
    unit: "CO2",
  },
  {
    icon: <WaterDrop sx={{ fontSize: 15, color: "#3b82f6" }} />,
    label: "Water",
    value: "0.00",
    unit: "Litre",
  },
  {
    icon: <AttachMoney sx={{ fontSize: 15, color: "#8b5cf6" }} />,
    label: "Cost",
    value: "$0.00",
    unit: "",
  },
];

function Info() {
  return (
    <Box
      sx={{
        p: 1.5,
        borderLeft: `${TOKENS.borderWidth} solid`,
        borderColor: "divider",
        overflow: "auto",
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: TOKENS.fontSizeTitle, mb: 1 }}>
        Sustainability Score
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0.75, mb: 1.5 }}>
        {SUSTAINABILITY.map(({ icon, label, value, unit }) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.2,
              p: 0.75,
              borderRadius: TOKENS.radiusSm,
              border: `${TOKENS.borderWidth} solid`,
              borderColor: "divider",
            }}
          >
            {icon}
            <Typography sx={{ fontSize: TOKENS.fontSizeXs, color: "text.secondary", lineHeight: 1.2 }}>
              {label}
            </Typography>
            <Typography sx={{ fontSize: TOKENS.fontSizeSm, fontWeight: 700, lineHeight: 1.2 }}>
              {value}
            </Typography>
            {unit && (
              <Typography sx={{ fontSize: TOKENS.fontSizeXs, color: "text.secondary", lineHeight: 1.2 }}>
                {unit}
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <Typography sx={{ fontWeight: 700, fontSize: TOKENS.fontSizeTitle, mb: 0.75 }}>
        Resources
      </Typography>

      {[
        { icon: <InfoOutlined sx={{ fontSize: 13 }} />, text: "NeuroSan v0.5.23" },
        { icon: <InfoOutlined sx={{ fontSize: 13 }} />, text: "Client v0.5.10" },
        { icon: <MenuBook sx={{ fontSize: 13 }} />, text: "Documentation" },
      ].map(({ icon, text }) => (
        <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
          <Box sx={{ color: "text.secondary", display: "flex" }}>{icon}</Box>
          <Typography sx={{ fontSize: TOKENS.fontSizeMd }}>{text}</Typography>
        </Box>
      ))}
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────
   AUDIO PLAYER — functional play/pause with progress bar
───────────────────────────────────────────────────────── */
function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlay = () => {
    if (playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setPlaying(false);
            return 0;
          }
          return p + 0.4;
        });
      }, 50);
    }
    setPlaying((prev) => !prev);
  };

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setProgress(((e.clientX - rect.left) / rect.width) * 100);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1.5,
        py: 0.75,
        borderTop: `${TOKENS.borderWidth} solid`,
        borderColor: "divider",
        flexShrink: 0,
      }}
    >
      <IconButton size="small" onClick={togglePlay} sx={{ color: "primary.main", p: 0.5 }}>
        {playing ? <Pause sx={{ fontSize: 18 }} /> : <PlayArrow sx={{ fontSize: 18 }} />}
      </IconButton>

      {/* Clickable progress bar */}
      <Box
        onClick={handleBarClick}
        sx={{
          flex: 1,
          height: 4,
          bgcolor: "divider",
          borderRadius: 2,
          position: "relative",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${progress}%`,
            bgcolor: TOKENS.colorPrimary,
            borderRadius: 2,
            transition: "width 0.05s linear",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: TOKENS.colorPrimary,
            boxShadow: "0 0 0 2px rgba(0,81,255,0.3)",
          }}
        />
      </Box>

      <IconButton size="small" sx={{ color: "text.secondary", p: 0.5 }}>
        <FiberManualRecord sx={{ fontSize: 13 }} />
      </IconButton>
      <IconButton size="small" sx={{ color: "text.secondary", p: 0.5 }}>
        <DeleteOutlined sx={{ fontSize: 15 }} />
      </IconButton>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────
   CHAT PANEL (right column)
───────────────────────────────────────────────────────── */
function ChatPanel() {
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        borderLeft: `${TOKENS.borderWidth} solid`,
        borderColor: "divider",
        overflow: "hidden",
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="fullWidth"
        sx={{
          borderBottom: `${TOKENS.borderWidth} solid`,
          borderColor: "divider",
          minHeight: 36,
          flexShrink: 0,
          "& .MuiTabs-indicator": { bgcolor: TOKENS.colorPrimary },
          "& .Mui-selected": { color: `${TOKENS.colorPrimary} !important` },
        }}
      >
        {["Chat", "Internal Chat", "SlyData", "Config"].map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>

      {/* Chat heading row */}
      <Box
        sx={{
          px: 2,
          py: 0.75,
          borderBottom: `${TOKENS.borderWidth} solid`,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: TOKENS.fontSizeLg }}>Chat</Typography>
        <IconButton size="small">
          <GetApp sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, p: 1.5, overflow: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
        <Paper
          variant="outlined"
          sx={{ p: 1, bgcolor: "background.default", borderRadius: TOKENS.radiusMd }}
        >
          <Typography sx={{ fontSize: TOKENS.fontSizeMd }}>Welcome to the chat</Typography>
        </Paper>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Paper
            sx={{
              p: 1,
              bgcolor: TOKENS.colorPrimary,
              border: `${TOKENS.borderWidth} solid ${TOKENS.colorPrimary}`,
              maxWidth: "80%",
              borderRadius: TOKENS.radiusMd,
            }}
          >
            <Typography sx={{ fontSize: TOKENS.fontSizeMd, color: "#fff" }}>
              Build me an agent network that can take care of the upcoming sale weekend.
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Audio player lives here, above the text input */}
      <AudioPlayer />

      {/* Message input */}
      <Box
        sx={{
          p: 1.5,
          borderTop: `${TOKENS.borderWidth} solid`,
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <TextField
          size="small"
          fullWidth
          multiline
          minRows={2}
          maxRows={3}
          placeholder="Type a message..."
          sx={{ mb: 1 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small">
              <AttachFile sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton size="small">
              <Mic sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: TOKENS.colorPrimary,
              fontSize: TOKENS.fontSizeSm,
              "&:hover": { bgcolor: TOKENS.colorPrimaryHover },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────
   ROOT APP — manages mode state, owns ThemeProvider
───────────────────────────────────────────────────────── */
export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const theme = buildTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "background.default",
        }}
      >
        {/* Header spans full width */}
        <Header mode={mode} onToggleMode={() => setMode((m) => (m === "dark" ? "light" : "dark"))} />

        {/* 3-column body — fills remaining height */}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "240px 1fr 340px",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <Sidebar />

          {/* Middle: Canvas on top, Logs+Info strip on bottom */}
          <Box sx={{ display: "flex", flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
            <Canvas />
            <Box
              sx={{
                height: 190,
                flexShrink: 0,
                display: "grid",
                gridTemplateColumns: "1fr 220px",
                borderTop: `${TOKENS.borderWidth} solid`,
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Logs />
              <Info />
            </Box>
          </Box>

          <ChatPanel />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
