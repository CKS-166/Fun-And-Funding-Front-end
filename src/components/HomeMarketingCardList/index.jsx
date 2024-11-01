import React from 'react';
import HomeMarketingProjectCard from '../HomeMarketingProjectCard';

function HomeMarketingCardList() {
    const cards = [1, 2, 3];
    return (
        <div className='flex justify-center w-full gap-[4rem]'>
            {cards.map((card, index) => (
                <HomeMarketingProjectCard key={index} />
            ))}
        </div>
    )
}

export default HomeMarketingCardList