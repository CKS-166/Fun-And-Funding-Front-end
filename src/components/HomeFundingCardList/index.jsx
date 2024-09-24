import React from 'react';
import FundingProjectCard from '../FundingProjectCard';

function HomeFundingCardList() {
    const cards = [1, 2, 3];
    return (
        <div className='flex justify-center w-full gap-[4rem]'>
            {cards.map((card, index) => (
                <FundingProjectCard key={index} />
            ))}
        </div>
    )
}

export default HomeFundingCardList