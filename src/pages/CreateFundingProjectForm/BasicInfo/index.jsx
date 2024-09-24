import { TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment, Grid, Grid2, Paper } from "@mui/material";
import FormDivider from "../../../components/CreateProject/ProjectForm/Divider";
import { useForm } from "react-hook-form";


const BasicInfo = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      category: '',
      projectName: '',
      description: '',
      goalAmount: '',
      startDate: '',
      endDate: ''
    }
  });

  return (
    <>
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
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category</InputLabel>
                <Select
                  label='Category'
                // {...register(name, { required: `${placeholder} is required` })}
                >
                  <MenuItem value="category1">Category 1</MenuItem>
                  <MenuItem value="category2">Category 2</MenuItem>
                </Select>
                {/* {error && <p className="text-red-600">{error.message}</p>} */}
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
              />
              <TextField
                label='End date'
                className="w-[50%]"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
          </Grid2>

          <div className="flex justify-center gap-5">
            <button
              className={`inline-block bg-gray-500 text-white font-bold py-2 mb-4 rounded px-[2rem] `}
              type="button"
            >
              Back
            </button>
            <button
              className="inline-block bg-primary-green text-white font-bold py-2 mb-4 rounded px-[2rem]"
              type="submit"
            >
              Next
            </button>
          </div>




        </div>
      </Paper>
    </>
  )
}

export default BasicInfo