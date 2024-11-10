import { Grid2, ImageList, ImageListItem, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import FormDivider from "../../../components/CreateProject/ProjectForm/Divider";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import ReactPlayer from "react-player";
import NavigateButton from "../../../components/CreateProject/ProjectForm/NavigateButton";
import { useCreateMarketplaceProject } from "../../../contexts/CreateMarketplaceProjectContext";
import Lightbox from "react-18-image-lightbox";
import Swal from "sweetalert2";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const MarketplaceProjectMedia = () => {
  const { marketplaceProject, setMarketplaceProject, setFormIndex } =
    useCreateMarketplaceProject();
  const { id } = useParams();
  const navigate = useNavigate();

  const [thumbnail, setThumbnail] = useState([]);
  const [projectVideo, setProjectVideo] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isThumbnailOpen, setIsThumbnailOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    setFormIndex(2);
  }, []);

  // Load initial values from marketplaceFiles
  useEffect(() => {
    if (!initialLoad) return;

    const { marketplaceFiles } = marketplaceProject;

    const thumbnailFile = marketplaceFiles.filter(
      (file) => file.filetype === 2
    );

    const videoFile = marketplaceFiles.filter((file) => file.filetype === 1);

    const imageFiles = marketplaceFiles.filter((file) => file.filetype === 4);

    setThumbnail(thumbnailFile);
    setProjectVideo(videoFile);
    setProjectImages(imageFiles);
    setInitialLoad(false);
  }, [marketplaceProject.marketplaceFiles, initialLoad]);

  const handleDeleteImage = () => {
    const deleteProjectImage = [...projectImages];
    if (deleteProjectImage.length <= 1) {
      Swal.fire({
        title: "Unable to delete",
        text: "You must have at least 1 bonus image.",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Do you want to delete the image?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          setProjectImages((prevImages) =>
            prevImages.filter((_, index) => index !== photoIndex)
          );
          setIsImageOpen(false);
          Swal.fire("Delete successfully!", "", "success");
        }
      });
    }
  };

  return (
    <Paper elevation={1} className="bg-white w-full overflow-hidden">
      <div className="bg-primary-green text-white flex justify-center h-[3rem] text-xl font-semibold items-center mb-4">
        Project Media Files
      </div>

      <div className="px-5">
        <FormDivider title="Project thumbnail image" />
        <Grid2 container spacing={2} className="my-8">
          <Grid2 size={3}>
            <h4 className="font-semibold text-sm mb-1">Project thumbnail*</h4>
            <p className="text-gray-500 text-xs">
              Provide a sharp, dynamic image for your project thumbnail.
            </p>
          </Grid2>
          <Grid2 size={9}>
            <img
              src={thumbnail[0]?.url}
              alt="Thumbnail preview"
              className="w-full h-[17.8rem] object-contain rounded-lg cursor-pointer"
              onClick={() => setIsThumbnailOpen(true)}
            />
            {isThumbnailOpen && (
              <Lightbox
                mainSrc={thumbnail[0].url}
                onCloseRequest={() => setIsThumbnailOpen(false)}
              />
            )}
          </Grid2>
        </Grid2>

        <FormDivider title="Project demo video" />
        <Grid2 container spacing={2} className="mt-8">
          <Grid2 size={3}>
            <h4 className="font-semibold text-sm mb-1">Project demo*</h4>
            <p className="text-gray-500 text-xs">
              Provide a 1-3 minute video introducing your project.
            </p>
          </Grid2>
          <Grid2 size={9}>
            {projectVideo.length > 0 && (
              <div className="mt-4">
                <ReactPlayer
                  url={projectVideo[0].url}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
            )}
          </Grid2>
        </Grid2>

        <FormDivider title="Project story images" />
        <Grid2 container spacing={2} className="my-8">
          <Grid2 size={3}>
            <h4 className="font-semibold text-sm mb-1">
              Project bonus images*
            </h4>
            <p className="text-gray-500 text-xs">
              Provide images that showcase different aspects of your project.
            </p>
          </Grid2>
          <Grid2 size={9}>
            <ImageList
              sx={{
                width: "70%",
                ml: "0 !important",
                maxHeight: "40rem",
                scrollbarWidth: "thin",
              }}
              cols={3}
              rowHeight={160}
            >
              {projectImages.map((item, index) => (
                <ImageListItem key={index} sx={{ bgcolor: "#000000" }}>
                  <img
                    src={item.url}
                    alt={`Project image ${index + 1}`}
                    loading="lazy"
                    style={{
                      cursor: "pointer",
                      height: "5rem",
                      objectFit: "contain",
                    }}
                    onClick={() => {
                      setPhotoIndex(index);
                      setIsImageOpen(true);
                    }}
                  />
                </ImageListItem>
              ))}

              {isImageOpen && projectImages && (
                <Lightbox
                  mainSrc={projectImages[photoIndex]?.url}
                  nextSrc={
                    projectImages[(photoIndex + 1) % projectImages.length]?.url
                  }
                  prevSrc={
                    projectImages[
                      (photoIndex + projectImages.length - 1) %
                        projectImages.length
                    ]?.url
                  }
                  onCloseRequest={() => setIsImageOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex(
                      (photoIndex + projectImages.length - 1) %
                        projectImages.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % projectImages.length)
                  }
                  toolbarButtons={[
                    <button
                      title="Delete"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.125rem",
                        marginRight: "0.5rem",
                        opacity: "0.7",
                        color: "#FFFFFF",
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = 1)}
                      onMouseLeave={(e) => (e.target.style.opacity = 0.7)}
                      onClick={handleDeleteImage}
                    >
                      🗑️
                    </button>,
                  ]}
                />
              )}
            </ImageList>
          </Grid2>
        </Grid2>

        <div className="flex justify-center gap-5 my-5">
          <NavigateButton
            text="Back"
            onClick={() =>
              navigate(`/request-marketplace-project/${id}/introduction`)
            }
          />
          <NavigateButton
            text="Next"
            onClick={() =>
              navigate(`/request-marketplace-project/${id}/bank-account`)
            }
          />
        </div>
      </div>
    </Paper>
  );
};

export default MarketplaceProjectMedia;
