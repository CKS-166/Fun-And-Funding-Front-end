import { Divider, Grid2 } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import SearchBar from "../../components/SearchBar";
import SortDropdown from "../../components/SortDropdown";
import { useLoading } from '../../contexts/LoadingContext';
import marketplaceProjectApiInstace from '../../utils/ApiInstance/marketplaceProjectApiInstance';
import './index.css';

const sortOptions = ["More than 50.000 VND", "More than 100.000 VND", "More than 200.000 VND"];
const MarketplaceHomePage = () => {
    const navigate = useNavigate();
    const [markets, setMarkets] = useState([]);
    const [selectedSortOptions, setSelectedSortOptions] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const { isLoading, setIsLoading } = useLoading()
    const fetchAllMarketProjects = async () => {
        try {
            setIsLoading(true)
            const response = await marketplaceProjectApiInstace.get("/");
            console.log(response);
            if (response.status === 200) {
                setMarkets(response.data._data.items);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllMarketProjects();
    }, [])

    const handleSortChange = (values) => {
        setSelectedSortOptions(values);
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    return (
        <div>
            <div className='crowBanner1 flex flex-col justify-center items-center h-[20rem]' >
                <div className=''>
                    <div className='text-white flex justify-center items-center text-center leading-[6.5rem]'>
                        <span className='font1 text-gray-200 text-[4rem]'>Fun&Funding <span className='font2 text-[6rem] text-gray-200'>marketplace</span></span>
                    </div>
                    <div className='text-center font1 text-lg text-gray-200'>
                        The <span className='text-primary-green font1'>Fun&Funding marketplace</span> is a collection of ready-to-deliver products that originated as <br />
                        crowdfunding campaigns. The coolest games, now ready and deliverable, <br />
                        without the wait!
                    </div>
                </div>
            </div>
            <div className='bg-[var(--white)]'>

            </div>
            <section class="bg-[var(--white)] py-8 antialiased md:py-12">
                <div class="mx-auto w-[90vw] px-4 2xl:px-0">
                    <Divider>
                        <span className='text-2xl text-gray-600 font-semibold font1'>
                            Game Collections
                        </span>
                    </Divider>
                    <div className='my-10'>
                        <div className="flex flex-row justify-between gap-[1rem] mb-[2rem]">
                            <SearchBar onSearchChange={handleSearchChange} />
                            <SortDropdown
                                options={sortOptions}
                                onValueChange={handleSortChange}
                            />
                        </div>
                    </div>
                    <Grid2 container spacing={4}>
                        {markets.map((item, index) => {
                            const fileWithType2 = item.marketplaceFiles.find(file => file.fileType === 2);
                            return (
                                <Grid2 size={3}>
                                    <div className='mb-[3rem]'>
                                        <div className="group relative rounded-lg overflow-hidden">
                                            <div className="relative h-[18rem] w-full overflow-hidden">
                                                <img
                                                    className="h-full w-full object-cover rounded-lg"
                                                    src={fileWithType2?.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"}
                                                    alt="Game product image"
                                                />
                                                <div className="absolute inset-0 flex items-end justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                    <button
                                                        onClick={() => navigate(`/marketplace-detail/${item.id}`)}
                                                        type="button"
                                                        className="mb-4 rounded bg-white px-5 py-2.5 text-lg w-[90%] text-gray-600 font-semibold hover:bg-primary-800 focus:outline-none transition-transform duration-300 group-hover:translate-y-0 transform translate-y-10"
                                                    >
                                                        View Detail
                                                    </button>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="mt-3">
                                            <ul className="flex items-center gap-4 ml-0">
                                                {item.categories.map((cate) => (
                                                    <li key={cate.name} className="flex items-center gap-2">
                                                        <p className="text-xs text-gray-50 bg-primary-green font-semibold rounded-sm px-1">{cate.name}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className='mt-2 mb-6'>
                                                <a
                                                    onClick={() => navigate(`/marketplace-detail/${item.id}`)}
                                                    className="text-3xl font-semibold leading-tight hover:cursor-pointer text-gray-900 hover:underline"
                                                >
                                                    {item.name}
                                                </a>
                                                <div className='max-w-[90%] font-light italic text-sm overflow-hidden text-ellipsis whitespace-nowrap'>{item.description}</div>
                                            </div>


                                            <div className="flex items-center justify-between gap-4">
                                                <p className="text-xl font-semibold leading-tight text-gray-800">
                                                    {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <span className='text-sm'>VND</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Grid2>


                            );
                        })}
                    </Grid2>
                </div>

            </section>

        </div>
    )
}

export default MarketplaceHomePage