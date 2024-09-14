import { Carousel } from "react-responsive-carousel";
import './index.css';
import { Box } from "@mui/material";
import { Children, useEffect, useRef, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ProjectImages() {
//   if (!images || images.length === 0) {
//     return null;
//   }

//   const medias = [
//     { type: 'video', src: liveDemo },
//     { type: 'image', src: thumbNail },
//     ...images.map(image => ({ type: 'image', src: image }))
//   ];
  // console.table(medias)

//   const customRenderThumb = () => {
//     return medias.map((media, index) => (
//       media.type === 'video'
//         ? (
//           <video key={index} height={'5rem !important'} muted>
//             <source src={media.src} type="video/mp4" />
//           </video>
//         )
//         : (
//           <img key={index} src={media.src} alt={`thumb-${index}`} />
//         )
//     ));
//   };


  return (
    <div>
      <Carousel showArrows={false} showIndicators={false} interval={3000}
        transitionTime={500} showStatus={false} >
          <div
            sx={{
              height: '30rem', borderRadius: '.2rem', overflow: 'hidden',
            }}
          >
            <img src='https://testupload123pp.blob.core.windows.net/pptestupload/storyImg1.jpg' />
          </div>
          <div
            sx={{
              height: '30rem', borderRadius: '.2rem', overflow: 'hidden',
            }}
          >
            <img src='https://testupload123pp.blob.core.windows.net/pptestupload/storyImg1.jpg' />
          </div>
      </Carousel>
    </div>

  )
}

export default ProjectImages;