import React from 'react';
import MarketingProjectCard from '../MarketingProjectCard';

function HomeMarketingCardList() {
    const cards = [1, 2, 3];
    return (
        <div className='flex justify-center w-full gap-[4rem]'>
            {cards.map((card, index) => (
                <MarketingProjectCard key={index} />
            ))}
        </div>
    )
}

export default HomeMarketingCardList