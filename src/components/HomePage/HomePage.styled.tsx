import { Box, styled } from "@mui/material";

export const Title = styled(Box)(({ theme }) => ({
  backgroundColor: "#282c34",
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}));

export const StyledCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  padding: theme.spacing(3),
  boxShadow:
    "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
}));
