import { Backdrop, Box, Button, Fade, Grid2, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditRewardItemTable from './EditRewardItemTable';
import './index.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60rem',
    bgcolor: '#F5F7F8',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    paddingLeft: '2.5rem !important',
    paddingRight: '2.5rem !important',
    paddingTop: '2rem !important',
    paddingBottom: '2rem !important',
    borderRadius: '0.625rem',
    minHeight: '30rem'
};

function EditPackageModal({ open, pkg, handleClose, handleUpdatePackage, isNewPackage }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [rewardItemError, setRewardItemError] = useState(false);
    const [detailEdited, isDetailEdited] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [rewardItems, setRewardItem] = useState(null);

    useEffect(() => {
        clearAllFields();
        setInitialData();
    }, [pkg]);

    const setInitialData = () => {
        if (pkg && !isNewPackage) {
            setName(pkg.name ?? "");
            setDescription(pkg.description ?? "");
            setPrice(pkg.requiredAmount ?? 0);
            setQuantity(pkg.limitQuantity ?? 0);
            setRewardItem(pkg.rewardItems ?? []);
        } else {
            setName("");
            setDescription("");
            setPrice(0);
            setQuantity(0);
            setRewardItem([]);
        }
    }

    const clearAllFields = () => {
        setImageUrl(null);
        setName("");
        setDescription("");
        setPrice(0);
        setQuantity(0);
        setRewardItem([]);
        setNameError(false);
        setPriceError(false);
        setQuantityError(false);
        setDescriptionError(false);
        setRewardItemError(false);
        isDetailEdited(false);
    };

    const handleChangeName = (event) => {
        const updatedName = event.target.value;
        setName(updatedName);
        if (!updatedName) {
            setNameError(true);
            isDetailEdited(false);
        } else {
            setNameError(false);
            checkIfEdited(updatedName, description, price, quantity, rewardItems);
        }
    };

    const handleChangeDescription = (event) => {
        const updatedDescription = event.target.value;
        setDescription(updatedDescription);
        if (!updatedDescription) {
            setDescriptionError(true);
            isDetailEdited(false);
        } else {
            setDescriptionError(false);
            checkIfEdited(name, updatedDescription, price, quantity, rewardItems);
        }
    };

    const handleChangePrice = (event) => {
        const updatedPrice = parseFloat(event.target.value);
        setPrice(updatedPrice);
        if (!updatedPrice) {
            setPriceError(true);
            isDetailEdited(false);
        } else {
            setPriceError(false);
            checkIfEdited(name, description, updatedPrice, quantity, rewardItems);
        }
    };

    const handleChangeQuantity = (event) => {
        const updatedQuantity = parseFloat(event.target.value);
        setQuantity(updatedQuantity);
        if (!updatedQuantity) {
            setQuantityError(true);
            isDetailEdited(false);
        } else {
            setQuantityError(false);
            checkIfEdited(name, description, price, updatedQuantity, rewardItems);
        };
    }

    const handleChangeRewardItem = (updatedRewardItems) => {
        setRewardItem(updatedRewardItems);
        if (!updatedRewardItems || updatedRewardItems.length === 0) {
            setRewardItemError(true);
            isDetailEdited(false);
        } else {
            setRewardItemError(false);
            checkIfEdited(name, description, price, quantity, updatedRewardItems);
        };
    }

    const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((value, index) => value === arr2[index]);
    };

    const checkIfEdited = (updatedName, updatedDescription, updatedPrice, updatedQuantity, updatedRewardItems) => {
        const rewardItemsEdited = arraysEqual(updatedRewardItems, pkg?.rewardItems || []) === false;
        if (
            updatedName !== pkg?.name ||
            updatedDescription !== pkg?.description ||
            updatedPrice !== pkg?.requiredAmount ||
            updatedQuantity !== pkg?.limitQuantity ||
            rewardItemsEdited
        ) {
            isDetailEdited(true);
        } else {
            isDetailEdited(false);
        }
    };

    const checkError = (name, description, price, quantity, rewardItems) => {
        let hasError = false;
        if (!name) {
            setNameError(true);
            hasError = true;
        } else {
            setNameError(false);
        }

        if (!description) {
            setDescriptionError(true);
            hasError = true;
        } else {
            setDescriptionError(false);
        }

        if (price === null || price === undefined || price <= 0) {
            setPriceError(true);
            hasError = true;
        } else {
            setPriceError(false);
        }

        if (quantity === null || quantity === undefined || quantity < 0) {
            setQuantityError(true);
            hasError = true;
        } else {
            setQuantityError(false);
        }

        if (!rewardItems || rewardItems.length === 0) {
            setRewardItemError(true);
            hasError = true;
        } else {
            setRewardItemError(false);
        }

        return hasError;
    };

    const handleSaveAll = async () => {
        const hasError = checkError(name, description, price, quantity, rewardItems);
        if (!hasError) {
            const updatedPackage = {
                id: pkg?.id || null,
                name: name,
                description: description,
                requiredAmount: price,
                limitQuantity: quantity,
                rewardItems: rewardItems || [],
            };
            isDetailEdited(false);
            handleUpdatePackage(updatedPackage);
            handleClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <div className='mb-[2rem]'>
                        <Typography sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
                            Package detail
                        </Typography>
                        <Typography sx={{ mt: '0.5rem', fontSize: '1rem', fontWeight: 400 }}>
                            Your package detail will be shown here, including reward items.
                        </Typography>
                    </div>
                    <Box sx={{ overflowY: 'auto', height: '30rem', scrollbarGutter: 'stable', pr: '0.75rem', mr: '0.75rem' }}>
                        <Grid2 container columnSpacing={"3rem"} sx={{ mb: '1.5rem' }}>
                            <Grid2 size={4.5}>
                                <Typography className='edit-package-modal-title'>
                                    Image<span className='text-[#1BAA64]'>*</span>
                                </Typography>
                                <label
                                    className="flex flex-col items-center justify-center w-full h-[18rem] border-2 border-[#2F3645] border-dashed rounded-lg cursor-pointer bg-[#EAEAEA] hover:bg-[#EAEAEA]"
                                >
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="Package preview"
                                            className="w-full h-[17.8rem] object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500"
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
                                            <p className="mb-2 text-sm text-gray-500">
                                                Click to upload
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                SVG, PNG, JPG or GIF (max. 800x400px)
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))}
                                    />
                                </label>
                            </Grid2>
                            <Grid2 size={7.5}>
                                <Typography className='edit-package-modal-title'>
                                    Package Name<span className='text-[#1BAA64]'>*</span>
                                </Typography>
                                <TextField
                                    value={name}
                                    onChange={handleChangeName}
                                    error={nameError}
                                    helperText={nameError ? "Package name is required" : ""}
                                    className="custom-update-textfield"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: '1.5rem' }}
                                />
                                <Box className='flex justify-between flex-row w-full'>
                                    <Box className='w-[47%]'>
                                        <Typography className='edit-package-modal-title'>
                                            Price<span className='text-[#1BAA64]'>*</span>
                                        </Typography>
                                        <TextField
                                            placeholder='Price...'
                                            className="custom-update-textfield"
                                            variant="outlined"
                                            required={true}
                                            value={price}
                                            onChange={handleChangePrice}
                                            sx={{
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    height: '3rem',
                                                },
                                                '& .MuiInputBase-input': {
                                                    padding: '0.5rem 0.75rem',
                                                },
                                            }}
                                            type='number'
                                            helperText={priceError ? "Must be at least 10,000" : " "}
                                            slotProps={{
                                                htmlInput: {
                                                    min: 10000,
                                                    step: 1000
                                                },
                                            }}
                                        />
                                    </Box>
                                    <Box className='w-[47%]'>
                                        <Typography className='edit-package-modal-title'>
                                            Quantity<span className='text-[#1BAA64]'>*</span>
                                        </Typography>
                                        <TextField
                                            placeholder='Quantity...'
                                            className="custom-update-textfield"
                                            variant="outlined"
                                            required={true}
                                            value={quantity}
                                            onChange={handleChangeQuantity}
                                            sx={{
                                                width: '100%',
                                                '& .MuiOutlinedInput-root': {
                                                    height: '3rem',
                                                },
                                                '& .MuiInputBase-input': {
                                                    padding: '0.5rem 0.75rem',
                                                },
                                            }}
                                            type='number'
                                            helperText={quantityError ? "Must be at least 0" : " "}
                                            slotProps={{
                                                htmlInput: {
                                                    min: 0,
                                                    step: 1
                                                },
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Typography className='edit-package-modal-title'>
                                    Description<span className='text-[#1BAA64]'>*</span>
                                </Typography>
                                <TextField
                                    value={description}
                                    onChange={handleChangeDescription}
                                    error={descriptionError}
                                    helperText={descriptionError ? "Description is required" : ""}
                                    className="custom-update-textfield"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    sx={{ mb: '1.5rem' }}
                                />
                            </Grid2>
                        </Grid2>
                        <div>
                            <Typography className='edit-package-modal-title'>
                                Reward items<span className='text-[#1BAA64]'>*</span>
                                {rewardItemError && (
                                    <span style={{ color: '#d9534f', marginLeft: '10px' }}>
                                        You must have at least 1 reward item
                                    </span>
                                )}
                            </Typography>
                            <EditRewardItemTable rewardItems={rewardItems} onUpdateRewardItems={handleChangeRewardItem} />
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '2rem' }}>
                        <Button onClick={handleClose} variant='outlined' sx={{ mr: '1rem', textTransform: 'none', borderColor: '#2F3645', color: '#2F3645' }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveAll}
                            variant='contained'
                            disabled={!detailEdited}
                            sx={{ textTransform: 'none', backgroundColor: '#1BAA64' }}
                        >
                            {pkg ? "Update Package" : "Add Package"}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default EditPackageModal;