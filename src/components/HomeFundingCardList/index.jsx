import React from 'react';
import HomeFundingProjectCard from '../HomeFundingProjectCard';

function HomeFundingCardList() {
    const cards = [1, 2, 3];
    return (
        <div className='flex justify-center w-full gap-[4rem]'>
            {cards.map((card, index) => (
                <HomeFundingProjectCard key={index} />
            ))}
        </div>
    )
}

export default HomeFundingCardList