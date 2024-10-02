import { TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment, Grid, Grid2, Paper } from "@mui/material";
import FormDivider from "../../../components/CreateProject/ProjectForm/Divider";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router";
import { useEffect,useState } from "react";
import NavigateButton from "../../../components/CreateProject/ProjectForm/NavigateButton";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const BasicInfo = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      categories: [
        {
          id : ''
        }
      ],
      projectName: '',
      description: '',
      target: '',
      startDate: '',
      endDate: ''
    }
  });

  const { setFormIndex, setProjectData } = useOutletContext();
  const [categories, setCategories] = useState([]); 
  const navigate = useNavigate();

  const fetchCates = async () => {
    try{
      await axios.get('https://localhost:7044/api/categories').then(res => {
        setCategories(res.data._data.items);
      })
    }catch(err){
      console.log(err)
    }
    
  }
  useEffect(() => {
    setFormIndex(0);
    fetchCates();
  }, []);

  const onSubmit = (data) => {
    setProjectData(prevData => ({
      ...prevData,
      ...data
    }));

    navigate('/request-funding-project/introduction');
  };

  const validateStartDate = (value) => {
    const today = new Date();
    const selectedDate = new Date(value);
    const minDate = new Date();
    minDate.setDate(today.getDate() + 7); // 7 days from today
    return selectedDate >= minDate || "Start date must be at least 7 days from today.";
  };

  const validateEndDate = (endDate) => {
    const startDate = watch('startDate');
    const start = new Date(startDate);
    const end = new Date(endDate);
    return end >= new Date(start.setDate(start.getDate() + 7)) || "End date must be at least 7 days after the start date.";
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const formData = watch();
      if (Object.values(formData).some(field => field !== '')) {
        const confirmationMessage = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={1} className="bg-white w-full overflow-hidden">
        <div className="bg-primary-green text-white flex justify-center h-[3rem] text-xl font-semibold items-center mb-4">
          Fill up basic info
        </div>

        <div className='px-5 py-4'>
          <FormDivider title={'Setup Category'} />
          <Grid2 container spacing={4} className="my-8">
            <Grid2 size={4}>
              <h4 className="font-semibold text-sm mb-1">Category*</h4>
              <p className="text-gray-500 text-xs">To help backers find your campaign, select a category that best represents your project.</p>
            </Grid2>
            <Grid2 size={8}>
              <FormControl fullWidth variant="outlined" error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  label='Category'
                  // {...register("categories", { required: "Category is required" })}
                  onChange={(e) => setValue("categories", { id: e.target.value })} // Update the category id here
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  ))}
                  
                </Select>
                {errors.category && <p className="text-red-600">{errors.category.message}</p>}
              </FormControl>
            </Grid2>
          </Grid2>

          <FormDivider title={'Project details'} />
          <Grid2 container spacing={4} className="my-8">
            <Grid2 size={4}>
              <h4 className="font-semibold text-sm mb-1">Project name*</h4>
              <p className="text-gray-500 text-xs">What is the title of your project?</p>
            </Grid2>
            <Grid2 size={8}>
              <TextField
                placeholder='Project name...'
                fullWidth
                variant="outlined"
                {...register("projectName", { required: "Project name is required" })}
                error={!!errors.projectName}
                helperText={errors.projectName?.message}
              />
            </Grid2>
          </Grid2>

          <Grid2 container spacing={4} className="my-8">
            <Grid2 size={4}>
              <h4 className="font-semibold text-sm mb-1">Project description*</h4>
              <p className="text-gray-500 text-xs">Provide a short description that best describes your campaign to your audience.</p>
            </Grid2>
            <Grid2 size={8}>
              <TextField
                placeholder='Project description...'
                fullWidth
                rows={4}
                multiline
                variant="outlined"
                {...register("description", { required: "Description is required" })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid2>
          </Grid2>

          <Grid2 container spacing={4} className="my-8">
            <Grid2 size={4}>
              <h4 className="font-semibold text-sm mb-1">Fundraising goal*</h4>
              <p className="text-gray-500 text-xs">How much money would you like to raise for this campaign?</p>
            </Grid2>
            <Grid2 size={8}>
              <TextField
                placeholder='Goal amount..'
                fullWidth
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                  inputProps: { min: '0' },
                }}
                variant="outlined"
                {...register("target", {
                  required: "Goal amount is required",
                  min: {
                    value: 10000,
                    message: "Goal amount must be at least 10,000 VND"
                  }
                })}
                error={!!errors.goalAmount}
                helperText={errors.goalAmount?.message}
              />
            </Grid2>
          </Grid2>

          <Grid2 container spacing={4} className="my-8">
            <Grid2 size={4}>
              <h4 className="font-semibold text-sm mb-1">Project duration*</h4>
              <p className="text-gray-500 text-xs">How many days will you be running your campaign for?</p>
            </Grid2>
            <Grid2 size={8}>
              <TextField
                className="w-[50%]"
                label='Start date'
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                {...register("startDate", { required: "Start date is required", validate: validateStartDate })}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />
              <TextField
                label='End date'
                className="w-[50%]"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                {...register("endDate", { required: "End date is required", validate: validateEndDate })}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            </Grid2>
          </Grid2>

          <div className="flex justify-center gap-5">
            <NavigateButton text={'Back'} disabled={true} />
            <NavigateButton text={'Next'} onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </Paper>
    </form>
  );
}



export default BasicInfo