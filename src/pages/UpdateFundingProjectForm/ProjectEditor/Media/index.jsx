import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FilePond } from "react-filepond";
import ReactPlayer from "react-player";
import { useParams } from 'react-router-dom';
import arcane from '../../../../assets/arcane.mp4';
import ktm from '../../../../assets/images/ktm.jpg';
import ProjectContext from '../../../../layouts/UpdateFundingProjectLayout/UpdateFundingProjectContext';

function Media() {
    const { id } = useParams();
    const { project, setProject, setIsEdited, setIsLoading, setLoadingStatus } = useContext(ProjectContext);

    const [thumbnail, setThumbnail] = useState(ktm);
    const [projectVideo, setProjectVideo] = useState(arcane);
    const [projectImages, setProjectImages] = useState([ktm]);
    const [additionalProjectImages, setAdditionalProjectImages] = useState([]);
    const [mediaEdited, setMediaEdited] = useState(false);

    useEffect(() => {

    }, [id, project]);

    const handleChangeAdditionalProjectImages = (newImages) => {
        setAdditionalProjectImages(newImages);
        checkIfEdited(newImages);
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
        console.log(additionalProjectImages);
        if (additionalProjectImages.length > 0) {
            additionalProjectImages.forEach((image, index) => {
                console.log(image);
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
                    Visual content helps engage supporters, build excitement, and foster stronger connections to your project's vision.
                </Typography>
            </div>
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                    sx={{ width: '70%', }}
                >
                    Project thumbnail<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                    sx={{ width: '70%', }}
                >
                    Provide a sharp, dynamic image for your project thumbnail.
                </Typography>
                <FilePond
                    files={thumbnail}
                    disabled
                    name="thumbnail"
                    acceptedFileTypes={['image/*']}
                    labelIdle='Your project thumbnail shows here'
                    className="custom-update-filepond"
                    allowRemove={false}
                />
            </div>
            <div className='basic-info-section'>
                <Typography
                    className='basic-info-title'
                    sx={{ width: '70%', }}
                >
                    Project demo<span className='text-[#1BAA64]'>*</span>
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                    sx={{ width: '70%', }}
                >
                    Provide a 1-3 minute video introducing your project.
                </Typography>
                <FilePond
                    files={projectVideo}
                    disabled
                    name="video"
                    acceptedFileTypes={['video/mp4', 'video/avi', 'video/mov']}
                    labelIdle='Your project demo shows here'
                    className="custom-update-filepond"
                    allowRemove={false}
                />
                {projectVideo.length > 0 && (
                    <div className="mt-[2rem]">
                        <ReactPlayer
                            url={projectVideo}
                            width="70%"
                            height="100%"
                            controls
                        />
                    </div>
                )}
            </div>
            <div className='basic-info-section !mb-[2rem]'>
                <Typography
                    className='basic-info-title'
                    sx={{ width: '70%', }}
                >
                    Project bonus images
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                    sx={{ width: '70%', }}
                >
                    Provide images that showcase different aspects of your project.
                </Typography>
                <FilePond
                    files={projectImages}
                    allowMultiple={true}
                    disabled={true}
                    maxFiles={4}
                    acceptedFileTypes={['image/*']}
                    name="images"
                    labelIdle='Your bonus images shows here'
                    className="custom-update-filepond"
                    allowRemove={false}
                />
            </div>
            <Divider sx={{ border: '1px solid #EAEAEA', borderRadius: '0.625rem', ml: '4rem', mr: '3rem' }} />
            <div className='basic-info-section !mb-[2rem]'>
                <Typography
                    className='basic-info-title'
                    sx={{ width: '70%', }}
                >
                    Add more images
                </Typography>
                <Typography
                    className='basic-info-subtitle'
                    sx={{ width: '70%', }}
                >
                    Your newly added image will be added as bonus images.
                </Typography>
                <FilePond
                    files={additionalProjectImages}
                    onupdatefiles={handleChangeAdditionalProjectImages}
                    allowMultiple={true}
                    maxFiles={4}
                    acceptedFileTypes={['image/*']}
                    name="images"
                    labelIdle='For updates, drag & drop files here or <span class="filepond--label-action">Browse</span>'
                    className="custom-update-filepond"
                />
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
    )
}

export default Media