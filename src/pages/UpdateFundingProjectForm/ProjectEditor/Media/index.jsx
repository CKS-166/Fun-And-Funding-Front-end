import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import ReactPlayer from "react-player";
import { useParams } from 'react-router-dom';
import ProjectContext from '../../../../layouts/UpdateFundingProjectLayout/UpdateFundingProjectContext';

function Media() {
    const { id } = useParams();
    const { project, setProject, setIsEdited, setIsLoading, setLoadingStatus } = useContext(ProjectContext);

    const [thumbnail, setThumbnail] = useState(null);
    const [projectVideo, setProjectVideo] = useState(null);
    const [projectImages, setProjectImages] = useState([]);
    const [additionalProjectImages, setAdditionalProjectImages] = useState([]);
    const [mediaEdited, setMediaEdited] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [photoIndex, setPhotoIndex] = useState(0);

    useEffect(() => {
        if (project.fundingFiles) {
            const videoFile = project.fundingFiles.find(file => file.filetype === 1);
            if (videoFile) {
                setProjectVideo(videoFile.url);
            }

            const thumbnailFile = project.fundingFiles.find(file => file.filetype === 2);
            if (thumbnailFile) {
                setThumbnail(thumbnailFile.url);
            }

            const imageFiles = project.fundingFiles.filter(file => file.filetype === 4);
            let imageUrls = imageFiles.length > 0 ? imageFiles.map(file => file.url) : [];

            console.log(imageFiles);

            const additionalSampleImages = [
                'https://funfundingmediafiles.blob.core.windows.net/fundingprojectfiles/ktm_2d370442-3d61-4ea2-9f80-27d1febcd505.jpg',
                'https://funfundingmediafiles.blob.core.windows.net/fundingprojectfiles/storyImg1_2776e2c2-0194-44a9-aee3-c771de1f2099.jpg',
                'https://funfundingmediafiles.blob.core.windows.net/fundingprojectfiles/storyImg1_2776e2c2-0194-44a9-aee3-c771de1f2099.jpg',
            ];

            imageUrls = [...imageUrls, ...additionalSampleImages];
            setProjectImages(imageUrls);
        }
    }, [id, project]);

    console.log(projectImages);

    const handleImageClick = (index) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const checkIfEdited = (updatedImages) => {
        if (updatedImages && updatedImages.length > 0) {
            setMediaEdited(true);
        } else {
            setMediaEdited(false);
        }
    };

    const handleSaveAll = async () => {
        setIsLoading(true);
        setLoadingStatus(2);
        const fundingFiles = [];
        if (additionalProjectImages.length > 0) {
            additionalProjectImages.forEach((image, index) => {
                fundingFiles.push({
                    name: `image_${index + 1}`,
                    url: image.file,
                    filetype: 4,
                });
            });
        }

        const updatedProject = {
            ...project,
            fundingFiles: fundingFiles,
        };

        setProject(updatedProject);
        setIsEdited(true);
        setMediaEdited(false);
        setIsLoading(false);
        setLoadingStatus(0);
    };

    const handleDiscardAll = () => {
        setAdditionalProjectImages(null);
        setMediaEdited(false);
    };

    return (
        <div className='w-full pb-[3rem]'>
            <div className='basic-info-section !mb-[2rem]'>
                <Typography
                    sx={{
                        color: '#2F3645',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        userSelect: 'none',
                        width: '70%',
                        marginBottom: '1rem'
                    }}
                >
                    Media files
                </Typography>
                <Typography
                    sx={{
                        color: '#2F3645',
                        fontSize: '1rem',
                        fontWeight: '400',
                        userSelect: 'none',
                        width: '70%',
                    }}
                >
                    Provide dynamic images and videos to showcase your project's unique features, giving backers a more immersive experience.
                </Typography>
            </div>
            <div className='basic-info-section'>
                <Typography className='basic-info-title' sx={{ width: '70%', }}>
                    Project thumbnail<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography className='basic-info-subtitle' sx={{ width: '70%', }}>
                    Provide a sharp, dynamic image for your project thumbnail.
                </Typography>
                <label
                    className="flex flex-col items-center justify-center w-[70%] h-[18rem] border-2 border-[#2F3645] border-dashed rounded-lg cursor-pointer bg-[#EAEAEA] dark:hover:border-[#92979F] dark:hover:bg-[#F0F1F2]"
                >
                    {thumbnail ? (
                        <div className="relative w-full h-[17.8rem] bg-[#2F3645] rounded-lg">
                            <img
                                src={thumbnail}
                                alt="Package preview"
                                className="w-full h-[17.8rem] object-contain rounded-lg"
                            />
                            <button
                                className="absolute inset-0 flex items-center justify-center bg-[#2F3645] bg-opacity-50 rounded-[0.25rem] opacity-0 hover:opacity-100 transition-opacity"
                                title="Change Image"
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <ChangeCircleIcon className="text-[#F5F7F9] !w-[4rem] !h-[4rem]" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-[5rem] h-[5rem] mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <h1 className="mb-[1.25rem] text-sm text-gray-500 !text-[1.5rem] font-semibold">Click to upload</h1>
                            <p className="text-xs text-gray-500 !text-[1rem] font-medium">
                                SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>
                        </div>
                    )}
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        accept="image/*"
                    />
                </label>
            </div>
            <div className='basic-info-section'>
                <Typography className='basic-info-title' sx={{ width: '70%', }}>
                    Project demo<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography className='basic-info-subtitle' sx={{ width: '70%', }}>
                    Provide a 1-3 minute video introducing your project.
                </Typography>
                {projectVideo ? (
                    <div className="relative overflow-hidden rounded-[0.625rem] w-[70%]">
                        <ReactPlayer
                            url={projectVideo}
                            width="100%"
                            height="100%"
                            controls
                        />
                    </div>
                ) : (
                    <label
                        className="flex flex-col items-center justify-center w-[70%] h-[18rem] border-2 border-[#2F3645] border-dashed rounded-lg cursor-pointer bg-[#EAEAEA] dark:hover:border-[#92979F] dark:hover:bg-[#F0F1F2]"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-[5rem] h-[5rem] mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <h1 className="mb-[1.25rem] text-sm text-gray-500 !text-[1.5rem] font-semibold">Click to upload</h1>
                            <p className="text-xs text-gray-500 !text-[1rem] font-medium">
                                MP4 (max. 5 minutes or 500MB)
                            </p>
                        </div>
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept="image/*"
                        />
                    </label>
                )}
            </div>
            <div className='basic-info-section !mb-[2rem]'>
                <Typography className='basic-info-title' sx={{ width: '70%', }}>
                    Project bonus images
                </Typography>
                <Typography className='basic-info-subtitle' sx={{ width: '70%', }}>
                    Provide images that showcase different aspects of your project.
                </Typography>
                <ImageList sx={{ width: '70%', height: '30rem' }} cols={3} rowHeight={164}>
                    {projectImages.map((item, index) => (
                        <ImageListItem key={index} onClick={() => handleImageClick(index)}>
                            <img
                                src={item}
                                alt={`Project image ${index + 1}`}
                                loading="lazy"
                                style={{ cursor: 'pointer' }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

                {isOpen && (
                    <Lightbox
                        mainSrc={projectImages[photoIndex]}
                        nextSrc={projectImages[(photoIndex + 1) % projectImages.length]}
                        prevSrc={projectImages[(photoIndex + projectImages.length - 1) % projectImages.length]}
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((photoIndex + projectImages.length - 1) % projectImages.length)
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex + 1) % projectImages.length)
                        }
                    />
                )}
            </div>
            <div className='basic-info-section !mb-0'>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '70%', gap: '1rem' }}>
                    <Button variant='outlined' color='error' disabled={!mediaEdited} sx={{ backgroundColor: 'transparent', textTransform: 'none' }} onClick={() => handleDiscardAll()}>
                        Discard
                    </Button>
                    <Button variant='contained' disabled={!mediaEdited} sx={{ backgroundColor: '#1BAA64', textTransform: 'none' }} onClick={() => handleSaveAll()}>
                        Save
                    </Button>
                </Box>
            </div>
        </div>
    );
}

export default Media;
