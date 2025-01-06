import { Avatar, Box, Button, Collapse, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import kuru from '../../assets/images/ktm.jpg'
import projectMilestoneApiInstace from '../../utils/ApiInstance/projectMilestoneApiInstance'
import { useParams } from 'react-router'
import Cookies from "js-cookie";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import userApiInstace from '../../utils/ApiInstance/userApiInstance'
import { ArrowDropDown, ArrowDropUp, ArrowRight, ChatBubble } from '@mui/icons-material'
import ProjectMilestoneModal2 from '../../pages/ProjectDetail/ProjectMilestoneModal2'
import { useLoading } from '../../contexts/LoadingContext'
const UpdatesSection = () => {
    const [pmData, setPmData] = useState(null)
    const { id } = useParams()
    const [userData, setUserData] = useState(null)
    const [selectedPm, setSelectedPm] = useState(null)

    const [openModal, setOpenModal] = useState(false)

    const token = Cookies.get("_auth")
    const { isLoading, setIsLoading } = useLoading()

    // console.log('pmData', pmData)
    const [openStageOne, setOpenStageOne] = useState(false); // collapse
    const [openStageTwo, setOpenStageTwo] = useState(false); // collapse

    const handleToggleCollapse1 = () => {
        setOpenStageOne((prev) => !prev);  // Toggle the collapse state
    };
    const handleToggleCollapse2 = () => {
        setOpenStageTwo((prev) => !prev);  // Toggle the collapse state
    };

    useEffect(() => {
        const fetchProjectMilestone = async () => {
            try {
                setIsLoading(true)
                const response = await projectMilestoneApiInstace.get("/", { params: { projectId: id } });
                setPmData(response.data?._data);
            } catch (error) {
                console.error("Error fetching milestone data:", error);
            }
            finally {
                setIsLoading(false)
            }
        };

        const fetchUserData = () => {
            userApiInstace
                .get("/info", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const userData = response.data._data;

                    setUserData(userData);
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                })
                .finally(() => {
                    // setIsLoading(false);
                });
        };


        fetchUserData()

        fetchProjectMilestone();

    }, [id, openModal]);

    return (
        <>
            {pmData && pmData.items.length == 0
                ? (
                    <div className='text-gray-500/90 text-2xl font-bold w-[100%] bg-gray-50 rounded-md p-5 h-[30rem] flex justify-center items-center'>
                        <span className='text-center'>
                            This funding project does not have any milestone withdrawals
                        </span>
                    </div>
                )
                : <div>
                    <div className='border-[0.1rem] border-gray-300 p-5 rounded'>
                        <div className='text-lg font-semibold mb-2'>
                            Concept & Prototype Stage
                        </div>
                        <div className='text-sm text-gray-700 mb-5'>
                            The project team has a working prototype, but it’s not the final product. They are still refining the concept, and their ability to move into full production may be impacted by development or financial challenges.
                            This stage can be reviewed and updated while the project is being funded.
                        </div>

                        {/* Button to toggle collapse */}
                        <Button
                            variant="outlined"
                            onClick={handleToggleCollapse1}
                            endIcon={openStageOne ? <ArrowDropUp /> : <ArrowDropDown />}
                            sx={{ color: 'black', borderColor: 'rgba(0, 0, 0, 0.3)', width: '10rem' }}
                        >
                            {openStageOne ? 'Hide Stage' : 'Show Stage'}
                        </Button>

                        {/* Collapse container */}
                        <Collapse in={openStageOne}>
                            <Timeline
                                sx={{
                                    [`& .${timelineOppositeContentClasses.root}`]: {
                                        flex: 0.2,
                                    },
                                    marginLeft: '-2rem',
                                    marginTop: '1rem'
                                }}
                            >
                                {pmData && pmData.items
                                    .filter(pm => pm.milestone.milestoneOrder === 1 || pm.milestone.milestoneOrder === 2)
                                    .reverse().map((pm, index) => (
                                        <TimelineItem key={pm.id}>
                                            <TimelineOppositeContent color="text.secondary">
                                                <div className='text-sm'>
                                                    {new Date(pm.createdDate).toLocaleDateString()}
                                                </div>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                {
                                                    index !== pmData.items.length - 1
                                                        ? <TimelineConnector sx={{ paddingBottom: '1rem' }} />
                                                        : null
                                                }
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ paddingBottom: '1rem' }}>
                                                <div className='text-sm font-semibold text-gray-700'>
                                                    {pm.milestone.milestoneName}
                                                </div>
                                                <div className='w-[35rem] bg-white rounded mt-3 border-[0.1rem]'>
                                                    <div className='p-8'>
                                                        <div className='text-sm italic font-semibold text-gray-500'>
                                                            Milestone #{pm.milestone.milestoneOrder}
                                                        </div>
                                                        <div className="flex items-center gap-4 my-3">
                                                            {
                                                                pm.fundingProject?.user?.avatar
                                                                    ? (
                                                                        <div>
                                                                            <img className="w-10 h-10 rounded-full" src={userData.avatar} alt="User Avatar" />
                                                                        </div>
                                                                    )
                                                                    : (
                                                                        <Avatar sx={{ width: 40, height: 40 }} />
                                                                    )
                                                            }
                                                            <div className="font-medium">
                                                                <div className='flex gap-3 items-center'>
                                                                    {pm.fundingProject?.user?.userName}
                                                                    <div className='text-white bg-primary-green text-sm px-3 rounded'>
                                                                        Game owner
                                                                    </div>
                                                                </div>
                                                                <div className="text-xs text-gray-500 italic">
                                                                    {pm.fundingProject?.user?.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Divider sx={{ my: '1rem' }} />
                                                        <div className='font-semibold text-xl mb-5'>
                                                            {pm.title}
                                                        </div>

                                                        <p className='text-sm'>
                                                            {pm.introduction}
                                                        </p>
                                                    </div>

                                                    <div className='px-8 py-5 border-t-2 flex justify-between'>
                                                        <div className='text-gray-500 text-sm'>
                                                            {/* <ChatBubble /> N/A */}
                                                        </div>
                                                        <div
                                                            onClick={() => { setSelectedPm(pm); setOpenModal(true); }}
                                                            className='text-gray-500 hover:underline hover:cursor-pointer'
                                                        >
                                                            Read more
                                                            <ArrowRight />
                                                        </div>
                                                    </div>
                                                </div>
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                            </Timeline>
                        </Collapse>
                    </div>
                    <div className='w-full flex justify-center'>
                        <div className='h-[2rem] border-s-2 border-gray-300 my-3'></div>
                    </div>
                    <div className='border-[0.1rem] border-gray-300 p-5 rounded'>
                        <div className='text-lg font-semibold mb-2'>
                            Production & Delivering Stage
                        </div>
                        <div className='text-sm text-gray-700 mb-5'>
                            The project team has transitioned from prototype development to final production.
                            The project team has begun to deliver product. The delivery may be affected by shipping challenges and delays.
                        </div>

                        {/* Button to toggle collapse */}
                        <Button
                            variant="outlined"
                            onClick={handleToggleCollapse2}
                            endIcon={openStageTwo ? <ArrowDropUp /> : <ArrowDropDown />}
                            sx={{ color: 'black', borderColor: 'rgba(0, 0, 0, 0.3)', width: '10rem' }}
                        >
                            {openStageTwo ? 'Hide Stage' : 'Show Stage'}
                        </Button>

                        {/* Collapse container */}
                        <Collapse in={openStageTwo}>
                            <Timeline
                                sx={{
                                    [`& .${timelineOppositeContentClasses.root}`]: {
                                        flex: 0.2,
                                    },
                                    marginLeft: '-2rem',
                                    marginTop: '1rem'
                                }}
                            >
                                {pmData && pmData.items
                                    .filter(pm => pm.milestone.milestoneOrder === 3 || pm.milestone.milestoneOrder === 4)
                                    .reverse().map((pm, index) => (
                                        <TimelineItem key={pm.id}>
                                            <TimelineOppositeContent color="text.secondary">
                                                <div className='text-sm'>
                                                    {new Date(pm.createdDate).toLocaleDateString()}
                                                </div>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                {
                                                    index !== pmData.items.length - 1
                                                        ? <TimelineConnector sx={{ paddingBottom: '1rem' }} />
                                                        : null
                                                }
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ paddingBottom: '1rem' }}>
                                                <div className='text-sm font-semibold text-gray-700'>
                                                    {pm.milestone.milestoneName}
                                                </div>
                                                <div className='w-[35rem] bg-white rounded mt-3 border-[0.1rem]'>
                                                    <div className='p-8'>
                                                        <div className='text-sm italic font-semibold text-gray-500'>
                                                            Milestone #{pm.milestone.milestoneOrder}
                                                        </div>
                                                        <div className="flex items-center gap-4 my-3">
                                                            {
                                                                pm.fundingProject?.user?.avatar
                                                                    ? (
                                                                        <div>
                                                                            <img className="w-10 h-10 rounded-full" src={userData.avatar} alt="User Avatar" />
                                                                        </div>
                                                                    )
                                                                    : (
                                                                        <Avatar sx={{ width: 40, height: 40 }} />
                                                                    )
                                                            }
                                                            <div className="font-medium">
                                                                <div className='flex gap-3 items-center'>
                                                                    {pm.fundingProject?.user?.userName}
                                                                    <div className='text-white bg-primary-green text-sm px-3 rounded'>
                                                                        Game owner
                                                                    </div>
                                                                </div>
                                                                <div className="text-xs text-gray-500 italic">
                                                                    {pm.fundingProject?.user?.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Divider sx={{ my: '1rem' }} />
                                                        <div className='font-semibold text-xl mb-5'>
                                                            {pm.title}
                                                        </div>

                                                        <p className='text-sm'>
                                                            {pm.introduction}
                                                        </p>
                                                    </div>

                                                    <div className='px-8 py-5 border-t-2 flex justify-between'>
                                                        <div className='text-gray-500 text-sm'>
                                                            {/* <ChatBubble /> N/A */}
                                                        </div>
                                                        <div
                                                            onClick={() => { setSelectedPm(pm); setOpenModal(true); }}
                                                            className='text-gray-500 hover:underline hover:cursor-pointer'
                                                        >
                                                            Read more
                                                            <ArrowRight />
                                                        </div>
                                                    </div>
                                                </div>
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                            </Timeline>
                        </Collapse>
                    </div>
                </div>
            }


            {
                pmData && selectedPm &&
                <ProjectMilestoneModal2 openModal={openModal} setOpenModal={setOpenModal} pmData={selectedPm} />
            }
        </>
    )
}

export default UpdatesSection