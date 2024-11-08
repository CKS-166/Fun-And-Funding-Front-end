import { Box, Typography } from "@mui/material";
import ProgressCircle from "../ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  return (
    <Box
      width="250px"
      height="120px" // Set a consistent height for all StatBoxes
      p="16px"
      borderRadius="8px"
      backgroundColor="#1a1d2c" // Dark background color
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxSizing="border-box"
    >
      <Box display="flex" alignItems="center">
        <Box mr="8px" color="#66C7F4"> {/* Icon color */}
          {icon}
        </Box>
        <Box>
          <Typography
            variant="h6" // Smaller size for the main statistic
            fontWeight="bold"
            color="#FFFFFF"
          >
            {title}
          </Typography>
          <Typography variant="body2" color="#66C7F4"> {/* Smaller subtitle */}
            {subtitle}
          </Typography>
        </Box>
      </Box>
      
     
    </Box>
  );
};

export default StatBox;