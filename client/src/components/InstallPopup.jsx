import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "styled-components";

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 16px;
    padding: 8px;
  }
`;

function InstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((result) => {
      if (result.outcome === "accepted") {
        console.log("User accepted install prompt");
      }
      setDeferredPrompt(null);
      setShow(false);
    });
  };

  const handleDismiss = () => {
    setShow(false);
    setDeferredPrompt(null);
  };

  return (
    <StyledDialog open={show} onClose={handleDismiss} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", pb: 0 }}>
        <IconWrapper>
          <Box
            component="img"
            src="/pwa-icon.png"
            alt="PeakPulse PWA Icon"
            sx={{ width: 64, height: 64, borderRadius: 2 }}
          />
        </IconWrapper>
        Install PeakPulse
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", pt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Install PeakPulse on your device for a better experience. Access your
          workouts even offline!
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 1 }}>
        <Button
          variant="contained"
          onClick={handleInstall}
          sx={{
            borderRadius: 2,
            px: 4,
            bgcolor: "#0D3B2E",
            "&:hover": { bgcolor: "#0A2E1A" },
          }}
        >
          Install
        </Button>
        <Button
          variant="outlined"
          onClick={handleDismiss}
          sx={{ borderRadius: 2, px: 4 }}
        >
          Not Now
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default InstallPopup;
