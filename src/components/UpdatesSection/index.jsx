import { Avatar, Box, Divider, Typography } from '@mui/material'
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
import { ArrowRight, ChatBubble } from '@mui/icons-material'
import ProjectMilestoneModal2 from '../../pages/ProjectDetail/ProjectMilestoneModal2'
const UpdatesSection = () => {
    const [pmData, setPmData] = useState(null)
    const { id } = useParams()
    const [userData, setUserData] = useState(null)
    const [selectedPm, setSelectedPm] = useState(null)

    const [openModal, setOpenModal] = useState(false)

    const token = Cookies.get("_auth")

    useEffect(() => {
        const fetchProjectMilestone = async () => {
            try {
                const response = await projectMilestoneApiInstace.get("/", { params: { projectId: id } });
                setPmData(response.data?._data);
            } catch (error) {
                console.error("Error fetching milestone data:", error);
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
    }, [id]);

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
                : ('')
            }
            <Timeline
                sx={{
                    [`& .${timelineOppositeContentClasses.root}`]: {
                        flex: 0.2,
                    },
                }}
            // position="alternate"
            >
                {pmData && pmData.items.map((pm, index) => (
                    <TimelineItem>
                        <TimelineOppositeContent color="text.secondary">
                            <div className='text-sm'>
                                {new Date(pm.createdDate).toLocaleDateString()}
                            </div>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            {
                                index != pmData.items.length
                                    ? (
                                        <TimelineConnector sx={{ paddingBottom: '2.5rem' }} />
                                    )
                                    : ''
                            }
                        </TimelineSeparator>
                        <TimelineContent sx={{ paddingBottom: '2.5rem' }}>
                            {pm.milestone.milestoneName}
                            <div className='w-[35rem] bg-white rounded mt-3 shadow-md '>
                                <div className='p-8'>
                                    <div className='text-sm italic font-semibold text-gray-500'>Milestone #{pm.milestone.milestoneOrder}</div>
                                    <div class="flex items-center gap-4 my-3">
                                        {
                                            userData?.avatar
                                                ? (<div>
                                                    <img class="w-10 h-10 rounded-full" src={userData.avatar} alt="" />
                                                </div>)
                                                : (
                                                    <Avatar sx={{ width: '10', height: '10' }}></Avatar>
                                                )
                                        }
                                        <div class="font-medium">
                                            <div className='flex gap-3 items-center'>
                                                {userData?.userName}
                                                <div className='text-white bg-primary-green text-sm px-3 rounded'>
                                                    Game owner
                                                </div>
                                            </div>
                                            <div class="text-sm text-gray-500">Joined in {new Date(userData?.createdDate).toDateString()}</div>
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
                                        <ChatBubble /> N/A
                                    </div>
                                    <div onClick={() => { setSelectedPm(pm); setOpenModal(true) }} className='text-gray-500 hover:underline hover:cursor-pointer'>
                                        Read more
                                        <ArrowRight />
                                    </div>
                                </div>
                            </div>


                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>

            {
                pmData && selectedPm &&
                <ProjectMilestoneModal2 openModal={openModal} setOpenModal={setOpenModal} pmData={selectedPm} />
            }
        </>
    )
}

export default UpdatesSection