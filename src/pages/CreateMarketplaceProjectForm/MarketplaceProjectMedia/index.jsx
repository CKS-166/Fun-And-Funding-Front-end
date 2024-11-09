import { Grid2, Paper } from "@mui/material";
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

  useEffect(() => {
    setFormIndex(2);
  }, []);

  // Load initial values from marketplaceFiles
  useEffect(() => {
    if (!initialLoad) return;

    const { marketplaceFiles } = marketplaceProject;

    const thumbnailFile = marketplaceFiles
      .filter((file) => file.filetype === 2)
      .map((file) => ({
        source: file.url,
        options: { type: "remote" },
      }));

    const videoFile = marketplaceFiles
      .filter((file) => file.filetype === 1)
      .map((file) => ({
        source: file.url,
        options: { type: "remote" },
      }));

    const imageFiles = marketplaceFiles
      .filter((file) => file.filetype === 4)
      .map((file) => ({
        source: file.url,
        options: { type: "remote" },
      }));

    setThumbnail(thumbnailFile);
    setProjectVideo(videoFile);
    setProjectImages(imageFiles);
    setInitialLoad(false);
  }, [marketplaceProject.marketplaceFiles, initialLoad]);

  // Update marketplaceFiles when file states change
  const handleFileUpdate = (files, type) => {
    const updatedMarketplaceFiles = [...marketplaceProject.marketplaceFiles];

    // Remove existing files of the current type
    const filteredFiles = updatedMarketplaceFiles.filter(
      (file) => file.filetype !== type
    );

    // Add new files
    const newFiles = files.map((fileItem, index) => ({
      name:
        type === 2 ? "thumbnail" : type === 1 ? "video" : `image_${index + 1}`,
      url: fileItem.file,
      filetype: type,
    }));

    setMarketplaceProject((prev) => ({
      ...prev,
      marketplaceFiles: [...filteredFiles, ...newFiles],
    }));
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
            <FilePond
              files={thumbnail}
              onupdatefiles={(files) => {
                setThumbnail(files);
                handleFileUpdate(files, 2);
              }}
              allowMultiple={false}
              maxFiles={1}
              acceptedFileTypes={["image/*"]}
              name="thumbnail"
              labelIdle='Drag & drop a file here or <span class="filepond--label-action">Browse</span>'
            />
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
            <FilePond
              files={projectVideo}
              onupdatefiles={(files) => {
                setProjectVideo(files);
                handleFileUpdate(files, 1);
              }}
              allowMultiple={false}
              maxFiles={1}
              acceptedFileTypes={["video/mp4", "video/avi", "video/mov"]}
              name="video"
              labelIdle='Drag & drop a file here or <span class="filepond--label-action">Browse</span>'
            />
            {projectVideo.length > 0 && (
              <div className="mt-4">
                <ReactPlayer
                  url={projectVideo[0].source}
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
            <FilePond
              files={projectImages}
              onupdatefiles={(files) => {
                setProjectImages(files);
                handleFileUpdate(files, 4);
              }}
              allowMultiple={true}
              maxFiles={4}
              acceptedFileTypes={["image/*"]}
              name="images"
              labelIdle='Drag & drop files here or <span class="filepond--label-action">Browse</span>'
            />
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
              navigate(`/request-marketplace-project/${id}/set-up-bank-account`)
            }
          />
        </div>
      </div>
    </Paper>
  );
};

export default MarketplaceProjectMedia;
