import { useProjectMilestoneApi } from "../../../utils/Hooks/ProjectMilestone"

const AdminMilestone = () => {

  const { data, error } = useProjectMilestoneApi()

  console.log(data)

  return (
    <>
      Showing (999) milestone disbursement request
    </>
  )
}

export default AdminMilestone