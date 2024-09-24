import React from 'react';
import CommentCard from '../TestimonialCard';

function TopTestimonialList() {
    const cards = [1, 2, 3, 4];
    return (
        <div className='flex justify-center w-full gap-[4rem]'>
            {cards.map((card, index) => (
                <CommentCard key={index} />
            ))}
        </div>
    )
}

export default TopTestimonialList