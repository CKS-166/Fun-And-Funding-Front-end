import { Link } from "react-router-dom";

const ProjectPlanCard = ({ option, title, brief, bullets, buttonText, commission }) => {

  const words = brief.split(" ");

  return (
    <>
      <div className='rounded p-12 bg-gradient-to-br from-white/20 via-white/35 to-white/25 backdrop-blur-3xl text-white'>
        <div className='text-lg mb-4 font-semibold'>{option}</div>
        <div className='text-4xl font-semibold font1 mb-4'>{title}</div>
        <div className='text-lg mb-2 font-semibold'>
          <span className='text-primary-green text-2xl'>{words[0]}</span> {words.slice(1).join(" ")}
        </div>
        <ul className='list-disc text-sm min-h-[8rem] list-inside my-5 leading-8'>
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
        <Link to='/request-funding-project/basic-info' className='inline-block bg-primary-green text-white font-bold py-3 px-4 mb-4 rounded' type='button'>{buttonText}</Link>
        <hr />
        <div className='py-3 font-semibold'>
          Fee: {commission}
        </div>
      </div>
    </>
  )
}

export default ProjectPlanCard