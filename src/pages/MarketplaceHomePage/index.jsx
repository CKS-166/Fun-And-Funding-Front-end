import React, { useState, useEffect } from 'react'
import { Box, Grid2, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import ktm from '../../assets/images/ktm.jpg';
import MarketPlaceCard from '../../components/MarketplaceProject/MarketplaceCard';
import './index.css'
import marketplaceProjectApiInstace from '../../utils/ApiInstance/marketplaceProjectApiInstance';
import { useNavigate } from 'react-router';
const MarketplaceHomePage = () => {
    const navigate = useNavigate();
    const [markets, setMarkets] = useState([]);
    const fetchAllMarketProjects = async () => {
        try {
            const response = await marketplaceProjectApiInstace.get("/");
            console.log(response);
            if (response.status === 200) {
                setMarkets(response.data._data.items);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchAllMarketProjects();
    }, [])
    const sampleArray = [1, 1, 1, 1, 1, 1];
    return (
        <div>
            <div className='crowBanner flex flex-col justify-center items-center h-[240px]' >
                <Typography variant='h1' className="!text-[20px] text-[#FFFF] !my-[14rem] !text-[6rem]">Fun&Funding Marketplace</Typography>
            </div>
            <section class="bg-gray-50 py-8 antialiased md:py-12">
                <div class="mx-auto w-[90vw] px-4 2xl:px-0">
                    <Grid2 container>
                        <Grid2 size={3}>
                            <div id="dropdown" class="z-10 w-[90%] p-3 bg-white rounded-lg shadow">
                                <h6 class="mb-3 text-xl font-medium text-gray-900">
                                    Category (hardcode)
                                </h6>
                                <ul class="space-y-2 text-md" aria-labelledby="dropdownDefault">
                                    <li class="flex items-center">
                                        <input id="apple" type="checkbox" value=""
                                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2" />

                                        <label for="apple" class="ml-2 text-md font-medium text-gray-900">
                                            Apple (56)
                                        </label>
                                    </li>

                                    <li class="flex items-center">
                                        <input id="fitbit" type="checkbox" value=""
                                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2" />

                                        <label for="fitbit" class="ml-2 text-md font-medium text-gray-900">
                                            Fitbit (56)
                                        </label>
                                    </li>

                                    <li class="flex items-center">
                                        <input id="dell" type="checkbox" value=""
                                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2" />

                                        <label for="dell" class="ml-2 text-md font-medium text-gray-900">
                                            Dell (56)
                                        </label>
                                    </li>

                                    <li class="flex items-center">
                                        <input id="asus" type="checkbox" value="" checked
                                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2" />

                                        <label for="asus" class="ml-2 text-md font-medium text-gray-900">
                                            Asus (97)
                                        </label>
                                    </li>

                                    <li class="flex items-center">
                                        <input id="logitech" type="checkbox" value="" checked
                                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2" />

                                        <label for="logitech" class="ml-2 text-md font-medium text-gray-900">
                                            Logitech (97)
                                        </label>
                                    </li>

                                    <li class="flex items-center">
                                        <input id="msi" type="checkbox" value="" checked
                                            class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2" />

                                        <label for="msi" class="ml-2 text-md font-medium text-gray-900">
                                            MSI (97)
                                        </label>
                                    </li>

                                </ul>
                            </div>
                        </Grid2>
                        <Grid2 size={9}>
                            <div class="mb-4 grid gap-5 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
                                {markets.map((item, index) => {
                                    const fileWithType2 = item.marketplaceFiles.find(file => file.fileType === 2);
                                    return (
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

                                    );
                                })}

                            </div>
                        </Grid2>
                    </Grid2>

                    {/* <div class="w-full text-center">
                        <button type="button" class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">Show more</button>
                    </div> */}
                </div>

            </section>

        </div>
    )
}

export default MarketplaceHomePage