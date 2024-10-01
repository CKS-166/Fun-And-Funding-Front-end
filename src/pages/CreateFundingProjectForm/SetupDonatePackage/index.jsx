import { Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router"
import FormDivider from "../../../components/CreateProject/ProjectForm/Divider"
import NavigateButton from "../../../components/CreateProject/ProjectForm/NavigateButton"
import PackageModal from "./PackageModal"
import EmptyIcon from '../../../assets/images/image_empty.png'
import axios from "axios"

const SetupDonatePackage = () => {

  const { setFormIndex, setProjectData, projectData } = useOutletContext()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const [projectPackages, setProjectPackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)

  const handleOpenAddPackage = () => {
    setSelectedPackage(null);
    setOpenModal(true);
  };

  const handleOpenEditPackage = (packageData) => {
    setSelectedPackage(packageData);
    setOpenModal(true);
  };

  const addPackage = (newPackage) => {
    setProjectPackages([...projectPackages, newPackage]);
    setOpenModal(false);
  };

  const editPackage = (updatedPackage) => {
    const updatedPackages = projectPackages.map((pkg) =>
      pkg.requiredAmount === updatedPackage.requiredAmount ? updatedPackage : pkg
    );
    setProjectPackages(updatedPackages);
    setOpenModal(false);
  };

  useEffect(() => {
    setProjectData((prev) => (
      {
        ...prev,
        'packages': projectPackages
      }
    ))
  }, [projectPackages])


  useEffect(() => {
    setFormIndex(4)
  }, [])

  // call api create project
  const createRequest = async () => {
    try {
      const response = await axios.post('https://localhost:7044/api/funding-projects', projectData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }

  return (
    <>
      <Paper elevation={1} className="bg-white w-full overflow-hidden]">
        <div className="bg-primary-green text-white flex justify-center items-center h-[3rem] text-xl font-semibold mb-4">
          Setup project donate packages
        </div>


        <div className='px-5 min-h-[25rem]'>
          <FormDivider title={'Set up donate packages'} />
          <div className='text-sm text-black/50 text-center my-1'>Set up support packages along with accompanying items and perks</div>


          <div className='text-right'>
            <button class="bg-gray-500 text-white text-sm font-bold py-1 px-3 rounded mt-5 mb-2"
              onClick={handleOpenAddPackage}
            >
              Add package
            </button>
          </div>
          {
            projectPackages.length > 0
              ? (
                <div class="relative overflow-x-auto table-fixed mb-10">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-600">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Image
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Rewards
                        </th>
                        <th scope="col" class="px-6 py-3 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        projectPackages.map((pkg, index) => (
                          <tr key={index} className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                              <img className='w-[5rem] h-[5rem]' src={pkg.imageUrl || 'default-image.png'} alt={pkg.name} />
                            </th>
                            <td className="px-6 py-4">{pkg.name}</td>
                            <td className="px-6 py-4">{pkg.limitQuantity}</td>
                            <td className="px-6 py-4">{pkg.requiredAmount} đ</td>
                            <td className="px-6 py-4">{pkg.rewardItems.length} item{pkg.rewardItems.length > 1 ? 's' : ''}</td>
                            <td className="px-1 py-4 text-center">
                              <a href="#" className="font-medium text-blue-600 hover:underline"
                                onClick={() => handleOpenEditPackage(pkg)}
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              )
              : (
                <div className='bg-gray-100 w-full h-[17rem] rounded flex justify-center items-center'>
                  <div>
                    <img className='w-[10rem] h-[10rem]' src={EmptyIcon} alt="data unavailable" />
                    <div className='font-semibold text-black/50'>Nothing to see here</div>
                  </div>
                </div>
              )
          }
          <PackageModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedPackage={selectedPackage}
            addPackage={addPackage}
            editPackage={editPackage}
          />
        </div>
        <div>
          <div className="flex justify-center gap-5 my-5">
            <NavigateButton text={'Back'} onClick={() => { navigate('/request-funding-project/setup-bank-account') }} />
            <NavigateButton text={'Request funding'} onClick={() => createRequest()} />
          </div>
        </div>
      </Paper>
    </>
  )
}

export default SetupDonatePackage