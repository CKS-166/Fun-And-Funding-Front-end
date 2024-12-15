import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, InputAdornment,
  RadioGroup, FormControlLabel, Radio, Pagination
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FaSearch } from "react-icons/fa";
import categoryApiInstance from '../../utils/ApiInstance/categoryApiInstance';
import fundingProjectApiInstance from '../../utils/ApiInstance/fundingProjectApiInstance';
import HomeFundingProjectCard from '../../components/HomeFundingProjectCard';
import './index.css';
const GetAllProject = () => {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [fromTarget, setFromTarget] = useState(null);
  const [projects, setProjects] = useState({
    items: [],
    totalPages: 1,
    pageIndex: 1
  });

  // Fetch categories
  const fetchCates = async () => {
    try {
      const res = await categoryApiInstance.get('/all');
      setCategories(res.data._data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch all projects
  const fetchAllProjects = async () => {
    try {
      const response = await fundingProjectApiInstance.get('/');
      setProjects({
        items: response.data._data.items,
        totalPages: response.data._data.totalPages,
        pageIndex: response.data._data.pageIndex
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchCates();
    fetchAllProjects();
  }, []);

  // Handle search
  const handleSearch = async () => {
    try {
      const response = await fundingProjectApiInstance.get('/', {
        params: {
          searchValue,
          fromTarget,
          pageSize: 3
        }
      });
      setProjects({
        items: response.data._data.items,
        totalPages: response.data._data.totalPages,
        pageIndex: response.data._data.pageIndex
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Handle radio change for target amount filter
  const handleRadioChange = (event) => {
    setFromTarget(event.target.value);
    handleSearch();
  };

  return (
    <div>
      <div className='crowBanner flex flex-col justify-center items-center h-[240px]' >
        <div className='py-[5rem]'>
          <div className='text-white flex justify-center items-center text-center leading-[6.5rem]'>
            <span className='font1 text-gray-200 text-[4rem]'>Funding Collection</span>
          </div>
          <div className='text-center font1 text-lg text-gray-300'>
            Explore projects, find your cause, and be a part of something extraordinary today! <br />
            without the wait!
          </div>
        </div>
      </div>
      <Box sx={{ marginTop: '5rem', padding: '30px' }}>
        <Grid container spacing={2}>
          {/* Sidebar Filters */}
          <Grid item size={3}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant='h1' className="!text-[20px] !mb-[2rem] !font-[500]">
                Filter
              </Typography>

              {/* Category Filter */}
              <Box>
                <Typography variant='h1' className="!text-[20px] !font-[500] !mb-[16px]">
                  CATEGORY
                </Typography>
                <Box>
                  <Typography className="!mb-[16px] font-[400]">
                    All
                  </Typography>
                  {categories.map((item, index) => (
                    <Typography key={index} className="!mb-[16px] font-[400]">
                      {item.name}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <div className='seperator'></div>

              {/* Target Amount Filter */}
              <Box mt={3}>
                <Typography variant="h1" className="!text-[20px] !font-[500] !mb-[16px]">
                  TARGET AMOUNT
                </Typography>
                <RadioGroup value={fromTarget} onChange={handleRadioChange}>
                  <FormControlLabel value="5000" control={<Radio />} label="> 5,000" />
                  <FormControlLabel value="50000" control={<Radio />} label="> 50,000" />
                  <FormControlLabel value="500000" control={<Radio />} label="> 500,000" />
                </RadioGroup>
              </Box>
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item size={9}>
            {/* Search Bar */}
            <Box>
              <TextField
                fullWidth
                id="fullWidth"
                placeholder='Search for projects'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" onClick={handleSearch}>
                      <FaSearch />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Project List */}
            <Box sx={{ marginTop: '6rem' }}>
              <Grid container spacing={2}>
                {projects.items && projects.items.length > 0 ? (
                  projects.items.map((item, index) => (
                    <Grid item size={4} key={index}>
                      <HomeFundingProjectCard fundingProject={item} />
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body1" className="text-[1rem]">
                    No funding project available
                  </Typography>
                )}
              </Grid>
            </Box>

            {/* Pagination */}
            <Pagination
              sx={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
              count={projects.totalPages}
              page={projects.pageIndex}
              onChange={(e, page) => {
                setProjects(prevState => ({ ...prevState, pageIndex: page }));
                handleSearch();
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default GetAllProject;