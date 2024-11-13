import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { TabContext, TabList } from "@mui/lab";
import { Avatar, Box, Button, Chip, CircularProgress, Container, Divider, Grid2, Paper, Rating, Stack, Tab, TextareaAutosize, Typography } from '@mui/material';
import DOMPurify from "dompurify";
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { useParams } from 'react-router';
import { toast, ToastContainer } from "react-toastify";
import MarketplaceCommentBar from '../../components/MarketplaceCommentBar';
import MarketplaceProjectImage from '../../components/MarketplaceProjectImage';
import MarketplaceProjectIntro from "../../components/MarketplaceProjectIntro";
import MarketplaceUpdateContent from '../../components/MarketplaceUpdateContent';
import AuthDialog from "../../components/Popup";
import { useCart } from '../../contexts/CartContext';
import { useLoading } from "../../contexts/LoadingContext";
import cartApiInstance from '../../utils/ApiInstance/cartApiInstance';
import commentApiInstace from '../../utils/ApiInstance/commentApiInstance';
import likeApiInstace from '../../utils/ApiInstance/likeApiInstance';
import marketplaceProjectApiInstace from '../../utils/ApiInstance/marketplaceProjectApiInstance';
import './index.css';

const notify = (message, type) => {
    const options = {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            backgroundColor: "#ffffff",
            color: "#2F3645",
            fontWeight: "600",
        },
    };

    if (type === "warn") {
        toast.warn(message, options);
    } else if (type === "success") {
        toast.success(message, options);
    } else if (type === "error") {
        toast.error(message, options);
    }
};

function MarketplaceProjectDetail() {
    const token = Cookies.get("_auth");
    const { id } = useParams();
    const { isLoading, setIsLoading } = useLoading();
    const { cartItems, cartCount, order, setCartItems, setCartCount, setOrder } = useCart();

    const [marketplaceProject, setMarketplaceProject] = useState({});
    const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
    const [tabValue, setTabValue] = useState("2");
    const [saniIntro, setSaniIntro] = useState("");
    const [liked, isLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [sendLoading, setSendLoading] = useState(false);

    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
    const openAuthDialog = () => setIsAuthDialogOpen(true);
    const closeAuthDialog = () => setIsAuthDialogOpen(false);

    useEffect(() => {
        fetchMarketplaceProject();
        fetchUserLike();
        fetchComments();
    }, [id]);

    const fetchMarketplaceProject = async () => {
        try {
            setIsLoading(true);
            const res = await marketplaceProjectApiInstace.get(`/${id}`)
            if (res.data._statusCode == 200) {
                setMarketplaceProject(res.data._data);
                setBackgroundImageUrl(res.data._data.marketplaceFiles?.find(file => file.fileType === 2)?.url);
                const sanitizeIntro = DOMPurify.sanitize(
                    res.data._data.introduction
                );
                setSaniIntro(sanitizeIntro);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const addGametoCart = async () => {
        try {
            setIsLoading(true);
            const res = await cartApiInstance.post(`/${id}`, '', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data._statusCode == 200) {
                fetchCartItems();
                notify("Add to cart successfully", "success");
            }
        } catch (error) {
            notify(error.response?.data?.message || error.message || "An error occurred", "error");
        } finally {
            setIsLoading(false);
        }
    }

    const fetchCartItems = async () => {
        try {
            const res = await cartApiInstance.get("", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data._statusCode == 200) {
                setCartItems(res.data._data.items);
                fetchCartCount();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchCartCount = async () => {
        try {
            const res = await cartApiInstance.get("/quantity", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.data._statusCode == 200) {
                setCartCount(res.data._data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetchUserLike = async () => {
        try {
            const res = await likeApiInstace.get(`/check-project-like/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data._statusCode == 200) {
                isLiked(res.data._data.isLike);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleLikeProject = async () => {
        try {
            const res = await likeApiInstace.post(`/marketplace/like`, {
                projectId: marketplaceProject.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data._statusCode == 200) {
                fetchUserLike();
            }
        } catch (error) {
            notify(error.response?.data?.message || error.message || "An error occurred", "error");
        }
    }

    const handleCommentProject = async () => {
        try {
            setSendLoading(true);
            const commentBody =
            {
                "content": comment,
                "projectId": { id }
            }
            const res = await commentApiInstace.post(``, commentBody, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data._statusCode == 200) {
                fetchComments();
            }
        } catch (error) {
            notify(error.response?.data?.message || error.message || "An error occurred", "error");
        } finally {
            setSendLoading(false);
        }
    }

    const fetchComments = async () => {
        try {
            const res = await commentApiInstace.get(`all`)
            if (res.status == 200) {
                setCommentList(res.data);
            }
        } catch (error) {
            notify(error.response?.data?.message || error.message || "An error occurred", "error");
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('de-DE').format(price);
    };

    const handleTabValue = (event, newValue) => {
        const validValues = ["1", "2", "3"];
        setTabValue(validValues.includes(newValue) ? newValue : "1");
    };

    return (
        <>
            <div className='flex justify-center items-center flex-col w-full'>
                <div
                    className="marketplace-project-card-info"
                    style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none', objectFit: 'cover' }}
                >
                    <div className="marketplace-project-card-overlay"></div>
                    <div className="marketplace-project-card-content">
                        <Grid2 container spacing={6}>
                            <Grid2 size={6.5} sx={{ display: 'flex', alignItems: 'center' }}>
                                <MarketplaceProjectImage
                                    files={marketplaceProject.marketplaceFiles ?? []}
                                />
                            </Grid2>
                            <Grid2
                                size={5.5}
                            >
                                <Paper sx={{ padding: '3rem', bgcolor: 'rgba(245, 247, 248, 0.6)' }}>
                                    <div className='flex flex-row gap-[0.5rem] mb-[0.75rem] overflow-x-auto pb-[0.5rem] w-[15rem]' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                        <style>
                                            {`
                                    .scrollable-category::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}
                                        </style>
                                        {marketplaceProject.categories && marketplaceProject.categories.map((item, index) => (
                                            <Chip
                                                key={index}
                                                label={item.name}
                                                className="scrollable-category"
                                                sx={{
                                                    borderRadius: '0.313rem',
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    backgroundColor: 'var(--primary-green)',
                                                    whiteSpace: 'nowrap',
                                                    color: 'var(--white)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <Typography sx={{ fontWeight: 700, fontSize: '2rem', textTransform: 'uppercase', mb: '1rem', color: 'var(--black)' }}>
                                        {marketplaceProject.name ?? 'N/A'}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 400, fontSize: '1rem', mb: '2rem' }}>
                                        {marketplaceProject.description}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: 'space-between',
                                            marginBottom: '2rem'
                                        }}
                                    >
                                        <div className='flex flex-row items-center flex-grow-0'>
                                            <Avatar
                                                sx={{
                                                    width: "3.5rem",
                                                    height: "3.5rem",
                                                    marginRight: "1rem",
                                                }}
                                                src={marketplaceProject.user?.avatar ?? ''}
                                            />
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontSize: "1.25rem",
                                                        fontWeight: '600',
                                                        width: '15rem',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        color: 'var(--black)'
                                                    }}
                                                >
                                                    {marketplaceProject.user?.userName ?? 'N/A'}
                                                </Typography>
                                                <Typography sx={{ fontSize: "0.75rem", opacity: "0.6", color: 'var(--black)' }}>
                                                    1 game selling | Viet Nam
                                                </Typography>
                                            </Box>
                                        </div>
                                        <div className='flex-shrink-0 flex flex-row space-x-[0.25rem] items-center'>
                                            <Rating defaultValue={2.5} precision={0.5} readOnly></Rating>
                                            <span className='text-[1rem] opacity-[0.6]'>(3.5)</span>
                                        </div>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: '2rem'
                                        }}>
                                        <div className='min-w-[50%]'>
                                            <Typography sx={{ fontSize: "1rem", opacity: "1", color: 'var(--black)' }}>
                                                Price
                                            </Typography>
                                            <Typography sx={{ fontWeight: 700, fontSize: '2rem', textTransform: 'uppercase', color: 'var(--black)' }}>
                                                {formatPrice(marketplaceProject.price)} VND
                                            </Typography>
                                        </div>
                                        <Divider orientation='vertical' sx={{ borderColor: 'var(--black)', ml: '3rem', mr: '1.5rem', borderWidth: '0.1rem', height: '3rem', }}></Divider>
                                        <div>
                                            <Typography sx={{ fontSize: "1rem", opacity: "1", color: 'var(--black)' }}>
                                                Purchased
                                            </Typography>
                                            <Typography sx={{ fontWeight: 600, fontSize: '2rem', textTransform: 'uppercase', color: 'var(--black)' }}>
                                                3
                                            </Typography>
                                        </div>
                                    </Box>
                                    <Stack spacing={2}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                width: "100%",
                                                whiteSpace: "nowrap",
                                                background: "#1BAA64",
                                                fontWeight: "bold",
                                                py: '0.75rem',
                                                fontSize: '1rem'
                                            }}
                                            onClick={() => addGametoCart()}
                                        >
                                            <AddShoppingCartIcon sx={{ mr: '1rem' }} />
                                            Add to cart
                                        </Button>
                                        <Grid2 container spacing={3} sx={{ marginTop: "20px" }}>
                                            <Grid2 size={6}>
                                                {liked ? <Button
                                                    variant="contained"
                                                    className='marketplace-project-unlike-button'
                                                    onClick={() => handleLikeProject()}
                                                >
                                                    <IoHeartDislikeOutline
                                                        style={{ marginRight: "0.5rem", fontSize: "1.5rem", strokeWidth: 1 }}
                                                    />
                                                    Unfollow
                                                </Button> : <Button
                                                    variant="contained"
                                                    className='marketplace-project-like-button'
                                                    onClick={() => handleLikeProject()}
                                                >
                                                    <FaRegHeart
                                                        style={{ marginRight: "0.5rem", fontSize: "1.5rem", strokeWidth: 1 }}
                                                    />
                                                    Follow
                                                </Button>}
                                            </Grid2>
                                            <Grid2 size={6}>
                                                <Button
                                                    variant="contained"
                                                    className='marketplace-project-report-button'
                                                >
                                                    <ReportGmailerrorredIcon
                                                        style={{ marginRight: "0.5rem", fontSize: "1.5rem" }}
                                                    />
                                                    Report
                                                </Button>
                                            </Grid2>
                                        </Grid2>
                                    </Stack>
                                </Paper>
                            </Grid2>
                        </Grid2>
                    </div>
                </div>
                <div className='w-full max-w-[1600px]'>
                    <TabContext value={tabValue}>
                        <Box className="marketplace-project-tab-context">
                            <Box>
                                <TabList
                                    onChange={handleTabValue}
                                    className="marketplace-project-tablist"
                                    sx={{
                                        '& .MuiTabs-scroller': {
                                            display: 'flex',
                                            justifyContent: 'center',
                                        },
                                    }}
                                >
                                    <Tab
                                        label="About"
                                        className="marketplace-project-tab"
                                        value="1"
                                    />
                                    <Tab
                                        label="Comments (2)"
                                        className="marketplace-project-tab"
                                        value="2"
                                    />
                                    <Tab
                                        label="Updates"
                                        className="marketplace-project-tab"
                                        value="3"
                                    />
                                </TabList>
                            </Box>
                        </Box>
                    </TabContext>
                    <Container
                        maxWidth={"lg"}
                        className="flex flex-row z-20"
                    >
                        {tabValue === "1" && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    marginTop: "3rem",
                                }}
                            >
                                <Box sx={{ mx: "8rem" }}>
                                    <Typography
                                        sx={{
                                            fontSize: "1.5rem",
                                            fontWeight: '700',
                                            color: 'var(--black)',
                                            mb: '2rem'
                                        }}
                                    >
                                        About
                                    </Typography>
                                    <Box>
                                        <MarketplaceProjectIntro intro={saniIntro} />
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        {tabValue === "2" && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    marginTop: "3rem",
                                }}
                            >
                                <Box sx={{ mx: "8rem" }}>
                                    <Typography
                                        sx={{
                                            fontSize: "1.5rem",
                                            fontWeight: '700',
                                            color: 'var(--black)',
                                            mb: '2rem'
                                        }}
                                    >
                                        Comments
                                    </Typography>
                                    <Box>
                                        <Paper sx={{ backgroundColor: 'var(--white)', borderRadius: '0.625rem' }} elevation={3}>
                                            {token != null ? <div>
                                                <Box
                                                    className="py-[2rem] px-[3rem]"
                                                    sx={{
                                                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
                                                        <Avatar
                                                            sx={{
                                                                width: "3.5rem",
                                                                height: "3.5rem",
                                                                marginRight: "1.25rem",
                                                            }}
                                                            src={''}
                                                        />
                                                        <div style={{ width: '100%' }}>
                                                            <div className='flex flex-row justify-start items-center'>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: "1.25rem",
                                                                        fontWeight: '700',
                                                                        color: 'var(--black)',
                                                                        mr: '0.5rem'
                                                                    }}
                                                                >
                                                                    diemyolo
                                                                </Typography>
                                                            </div>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "0.875rem",
                                                                    fontWeight: '600',
                                                                    color: 'var(--primary-green)',
                                                                    mb: '1rem'
                                                                }}
                                                            >
                                                                Backer
                                                            </Typography>
                                                            <TextareaAutosize
                                                                color="primary"
                                                                minRows={3}
                                                                placeholder='What are your thoughts?'
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '1rem 1rem',
                                                                    borderRadius: '0.625rem',
                                                                    border: '1px solid rgba(0, 0, 0, 0.3)',
                                                                    color: 'var(--black)',
                                                                    outline: 'none',
                                                                    backgroundColor: 'var(--white)',
                                                                    marginBottom: '1rem'
                                                                }}
                                                                onChange={(e) => setComment(e.target.value)}
                                                            />
                                                            <div className='flex justify-between'>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: "0.875rem",
                                                                        fontWeight: '400',
                                                                        color: 'var(--black)',
                                                                    }}
                                                                >
                                                                    *Everyone, including game owner, will see your comments
                                                                </Typography>
                                                                <Button
                                                                    variant="contained"
                                                                    sx={{
                                                                        width: "6rem",
                                                                        whiteSpace: "nowrap",
                                                                        background: "#1BAA64",
                                                                        fontWeight: "bold",
                                                                        textTransform: 'none',
                                                                        py: '0.5rem',
                                                                        fontSize: '0.75rem'
                                                                    }}
                                                                    onClick={() => handleCommentProject()}
                                                                    disabled={sendLoading}
                                                                >
                                                                    {sendLoading ? <CircularProgress size={20} sx={{ color: 'var(--white)' }} /> : "Submit"}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Box>
                                                </Box>

                                            </div>
                                                :
                                                <Box
                                                    className="py-[2rem] px-[3rem] flex justify-between items-center"
                                                    sx={{
                                                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                                                    }}
                                                >
                                                    <div>
                                                        <Typography
                                                            sx={{
                                                                fontSize: "1.25rem",
                                                                fontWeight: '700',
                                                                color: 'var(--black)',
                                                                mb: '1rem',
                                                            }}
                                                        >
                                                            Login to comment
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                fontSize: "1rem",
                                                                fontWeight: '400',
                                                                color: 'var(--black)',
                                                            }}
                                                        >
                                                            You must be logged in to comment.
                                                        </Typography>
                                                    </div>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            width: "6rem",
                                                            whiteSpace: "nowrap",
                                                            background: "#1BAA64",
                                                            fontWeight: "bold",
                                                            textTransform: 'none',
                                                            py: '0.5rem',
                                                            fontSize: '1rem'
                                                        }}
                                                        onClick={openAuthDialog}
                                                    >
                                                        Sign In
                                                    </Button>
                                                </Box>
                                            }
                                            <div className='py-[2rem] px-[3rem]'>
                                                <Typography
                                                    sx={{
                                                        fontSize: "1.5rem",
                                                        fontWeight: '700',
                                                        color: 'var(--black)',
                                                        mb: '2rem'
                                                    }}
                                                >
                                                    All comments (2)
                                                </Typography>
                                                {commentList != null && commentList.length > 0 ?
                                                    commentList.map((item, index) => (
                                                        <MarketplaceCommentBar key={index} response={item} index={index} />
                                                    ))
                                                    : <Typography
                                                        sx={{
                                                            fontSize: "1rem",
                                                            fontWeight: '400',
                                                            color: 'var(--black)',
                                                        }}
                                                    >
                                                        Be the first one to comment on this project
                                                    </Typography>
                                                }
                                            </div>
                                        </Paper>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        {tabValue === "3" && (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    marginTop: "3rem",
                                }}
                            >
                                <Box sx={{ mx: "8rem" }}>
                                    <Typography
                                        sx={{
                                            fontSize: "1.5rem",
                                            fontWeight: '700',
                                            color: 'var(--black)',
                                            mb: '2rem'
                                        }}
                                    >
                                        Updates
                                    </Typography>
                                    <Box>
                                        <MarketplaceUpdateContent />
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Container>
                </div>
            </div >
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                pauseOnFocusLoss
            />
            <AuthDialog isOpen={isAuthDialogOpen} onClose={closeAuthDialog} />
        </>
    )
}

export default MarketplaceProjectDetail