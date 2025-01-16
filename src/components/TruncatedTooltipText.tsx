import React from "react";
import { Tooltip, Typography } from "@mui/material";

interface TruncatedTooltipTextProps {
  value: string | number;
  variant?: "body1" | "body2" | "caption" | "h6" | "h5"; 
  fontWeight?: number;
}

const TruncatedTooltipText: React.FC<TruncatedTooltipTextProps> = ({
  value,
  variant = "body2",
  fontWeight = 500,
}) => {
  const formattedValue = typeof value === "number" ? value.toFixed(2) : value;

  return (
    <Tooltip title={formattedValue} arrow placement="top">
      <Typography
        variant={variant}
        fontWeight={fontWeight}
        sx={{
          display: "-webkit-box",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "normal",
          maxHeight: "48px", 
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {formattedValue}
      </Typography>
    </Tooltip>
  );
};

export default TruncatedTooltipText;