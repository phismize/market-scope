import React, { useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { Box } from "@mui/material";
import { LoadingCard } from "./components/LoadingCard";
import SimpleTabs from "./components/TabPanel";
import { CalculatorScreen } from "./screens/CaliculatorScreen";
import { useTheme } from "@emotion/react";

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [hideApp, setHideApp] = useState(true); // for loading animation
  const { width, height } = useWindowDimensions();
  const launchTimeSeconds = 2;
  useEffect(() => {
    // 数秒後にアプリを表示する
    setTimeout(() => setHideApp(false), (launchTimeSeconds - 1) * 1000);
    // 数秒後にローディングを解除する
    setTimeout(() => setLoading(false), launchTimeSeconds * 1000);
  }, []);
  return (
    <Box className="app" width={width} height={height}>
      {loading ? <LoadingCard /> : <></>}
      {hideApp ? (
        <></>
      ) : (
        <SimpleTabs
          tabs={[
            {
              label: "CALICULATOR",
              content: <CalculatorScreen />,
            },
          ]}
        />
      )}
    </Box>
  );
};
