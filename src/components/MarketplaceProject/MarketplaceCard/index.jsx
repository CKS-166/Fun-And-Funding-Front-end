import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const MarketPlaceCard = ({ image, title, description, price, category }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#F5F7F8',
        boxShadow: 'none', // Removes the box shadow
        '&:hover .overlay': { opacity: 1 }, // Show overlay on Card hover
        
      }}
    >
      {/* Card Header with Image */}
      <Box sx={{ position: 'relative', height: 312, overflow: 'hidden', borderRadius: '10px' }}>
        <CardMedia
          component="img"
          height="312"
          image={image}
          alt={title}
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.1)' },
            borderRadius: '10px',
          }}
        />

        {/* Overlay with Button on Hover */}
        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            opacity: 0, // Initially hidden
            transition: 'opacity 0.3s ease',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#1BAA64',
              marginBottom: '20px',
              width: '90%',
            }}
          >
            View Game
          </Button>
        </Box>
      </Box>

      {/* Card Content with Description and Price */}
      <CardContent sx={{ padding: '16px' }}>
        {/* Category */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: '8px',
          }}
        >
          {category}
        </Typography>

        {/* Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: '8px',
          }}
        >
          {title}
        </Typography>

        {/* Price Section */}
        <Box sx={{ paddingTop: '20px' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: '0.8rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            Price
          </Typography>

          <Typography
            variant="h5"
            color="text.primary"
            sx={{
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            VND {price.toLocaleString('de-DE')}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MarketPlaceCard;