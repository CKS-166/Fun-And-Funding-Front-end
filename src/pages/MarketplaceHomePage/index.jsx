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
                    {/* <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                        <div class="flex items-center space-x-4">
                            <button data-modal-toggle="filterModal" data-modal-target="filterModal" type="button" class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
                                <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                                </svg>
                                Filters
                                <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                </svg>
                            </button>
                            <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
                                <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
                                </svg>
                                Sort
                                <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                </svg>
                            </button>
                            <div id="dropdownSort1" class="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow" data-popper-placement="bottom">
                                <ul class="p-2 text-left text-sm font-medium text-gray-500" aria-labelledby="sortDropdownButton">
                                    <li>
                                        <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"> The most popular </a>
                                    </li>
                                    <li>
                                        <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"> Newest </a>
                                    </li>
                                    <li>
                                        <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"> Increasing price </a>
                                    </li>
                                    <li>
                                        <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"> Decreasing price </a>
                                    </li>
                                    <li>
                                        <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"> No. reviews </a>
                                    </li>
                                    <li>
                                        <a href="#" class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900"> Discount % </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
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
                            <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
                                {markets.map((item, index) => {
                                    // Get the file with fileType = 2
                                    const fileWithType2 = item.marketplaceFiles.find(file => file.fileType === 2);
                                    return (
                                        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                            <div class="h-56 w-full">
                                                <a
                                                // onClick={() => navigate(`/marketplace-detail/${item.id}`)}
                                                >
                                                    <img class="mx-auto h-full object-contain" src={fileWithType2?.url || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"} alt="Game product image" />
                                                </a>
                                            </div>
                                            <div class="pt-6">
                                                <div class="mb-4 flex items-center justify-between gap-4">
                                                    <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 bg-primary-green/30"> Up to 35% off (hardcode)</span>
                                                </div>

                                                <a
                                                    onClick={() => navigate(`/marketplace-detail/${item.id}`)}
                                                    class="text-lg font-semibold leading-tight hover:cursor-pointer text-gray-900 hover:underline">{item.name}</a>

                                                <div class="mt-2 flex items-center gap-2">
                                                    <div class="flex items-center">
                                                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                        </svg>

                                                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                        </svg>

                                                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                        </svg>

                                                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                        </svg>

                                                        <svg class="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                        </svg>
                                                    </div>

                                                    <p class="text-sm font-medium text-gray-900">5.0</p>
                                                    <p class="text-sm font-medium text-gray-500">(455) (hardcode)</p>
                                                </div>

                                                <ul class="mt-2 flex items-center gap-4 ml-0">
                                                    <li class="flex items-center gap-2">
                                                        <p class="text-sm font-medium text-gray-500">Category 1</p>
                                                    </li>

                                                    <li class="flex items-center gap-2">
                                                        <p class="text-sm font-medium text-gray-500">Category 2 (hardcode)</p>
                                                    </li>
                                                </ul>

                                                <div class="mt-4 flex items-center justify-between gap-4">
                                                    <p class="text-2xl font-extrabold leading-tight text-gray-900">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</p>

                                                    <button
                                                        onClick={() => navigate(`/marketplace-detail/${item.id}`)}
                                                        type="button" class="inline-flex items-center rounded-lg bg-primary-green px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300">
                                                        {/* <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                        </svg> */}
                                                        View detail
                                                    </button>
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