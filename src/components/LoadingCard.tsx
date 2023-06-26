import React from "react";
import { Box, Fade, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";

export const LoadingCard: React.FC = () => {
  const gradient = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;

  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={show} timeout={1000}>
      <Box
        zIndex={100}
        position="absolute"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh" // fill the viewport
        width="100vw" // fill the viewport
        color="text.primary"
        textAlign="center"
        sx={{
          background: "#1E75B9",
          backgroundSize: "200% 200%",
          animation: `${gradient} 3s ease infinite`,
        }}
      >
        <img src="/loading-icon.png" width="200px" height="200px" />
      </Box>
    </Fade>
  );
};
