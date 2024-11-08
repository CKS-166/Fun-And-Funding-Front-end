import { Rating } from "@mui/material"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useProjectMilestoneBackerApi } from "../../../utils/Hooks/ProjectMilestoneBacker"
import userApiInstace from "../../../utils/ApiInstance/userApiInstance"
import projectMilestoneBackerApiInstance from "../../../utils/ApiInstance/projectMilestoneBackerApiInstance"

const ProjectMilestoneReviewForm = ({ pmId }) => {

  const [star, setStar] = useState(3.5)
  const [comment, setComment] = useState('')
  const [userData, setUserData] = useState()

  const token = Cookies.get("_auth")
  const fetchUserData = () => {
    userApiInstace
      .get("/info", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data._data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData()
  }, [])

  const handlePostReview = async () => {
    // const { data, error } = useProjectMilestoneBackerApi("/", "POST", {
    //   star: star,
    //   comment: comment,
    //   backerId: userData?.id,
    //   projectMilestoneId: pmId
    // });

    try {
      const response = await projectMilestoneBackerApiInstance.request({
        url: '/',
        method: 'POST',
        data: {

          star: star,
          comment: comment,
          backerId: userData?.id,
          projectMilestoneId: pmId

        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      // setIsLoading(false);
    }
  }

  return (
    <>
      <div className="bg-gray-50 rounded">
        <div class="w-full mb-4 border border-gray-200 rounded-lg px-5">
          <div className="py-5">
            <div class="flex items-center">
              <p class="inline-flex items-center mr-2 text-sm text-gray-900 font-semibold">
                <img
                  class="mr-2 w-6 h-6 rounded-full"
                  src={userData?.avatar || "https://i.ibb.co/pZbTH0B/user.png"}
                  alt="User avatar" />
                {userData?.userName}
                <span class="bg-primary-green text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded ml-2">Backer</span>
              </p>
            </div>
          </div>
          <Rating
            value={star}
            onChange={(e) => setStar(e.target.value)}
            size="large"
            precision={0.5} />
          <div class="px-4 py-2 bg-white rounded">
            <textarea id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 focus-visible:outline-none" placeholder="Write a comment..." required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <button
            onClick={() => handlePostReview()}
            class="inline-flex items-center my-3 py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-green rounded-lg hover:bg-primary-green/80">
            Post review
          </button>
        </div>
      </div>

    </>
  )
}

export default ProjectMilestoneReviewForm