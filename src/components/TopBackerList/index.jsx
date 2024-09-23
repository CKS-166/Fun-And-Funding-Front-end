import React from 'react';
import BackerCard from '../BackerCard';

function TopBackerList() {
    const cards = [1, 2, 3, 4];
    return (
        <div className='flex justify-center w-full gap-[4rem]'>
            {cards.map((card, index) => (
                <BackerCard key={index} />
            ))}
        </div>
    )
}

export default TopBackerList