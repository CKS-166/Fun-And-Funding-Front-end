import NotificationCard from "../NotificationCard"
import { Box, Divider } from "@mui/material"

const NotificationMenu = ({ notiData }) => {

  return (
    <>
      <Box
        sx={{ boxShadow: 5, background: 'var(--white)' }}
        className="h-20rem rounded-md overflow-hidden w-[25rem] ">
        <div className="bg-[var(--white)] font-semibold text-black p-3">
          Notifications
        </div>
        {/* <Divider /> */}
        <div>
          <NotificationCard notiData={notiData} />
        </div>
        <div className="flex items-center justify-center gap-1 px-2 py-3 hover:cursor-pointer bg-[var(--white)] text-center">
          <span className="text-white px-3 py-2 font-semibold w-[100%] text-sm rounded bg-primary-green">
            View all notifications
          </span>
        </div>
      </Box>

    </>
  )
}

export default NotificationMenu