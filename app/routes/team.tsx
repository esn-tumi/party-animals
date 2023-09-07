import dan from '../../public/images/dan_crop.png'
import matthias from '../../public/images/matthias_crop.png'
import martin from '../../public/images/martin_crop.jpg'
import alissa from '../../public/images/alissa.png'
import bence from '../../public/images/bence.png'
import nicolas from '../../public/images/nicolas.png'
import pia from '../../public/images/pia.png'
import szilvi from '../../public/images/szilvi.png'
import alphar from '../../public/images/alphar.png'
import samuel from '../../public/images/samuel.png'

export default function Team() {
    const orga = [
    { img: matthias, name: "Matthias Decarli", responsibility: "Lead, Supervising"},
    { img: szilvi, name: "Szilvia Keszthelyi", responsibility: "Lead, Supervising, Internal HR"},
    { img: martin, name: "Martin Mocker", responsibility: "Lead, Event Coordination"},
        { img: dan, name: "Dan Bachar", responsibility: "IT, General Organization"},
    ];

    const tutors = [
        { img: pia, name: "Pia Schmitzer", responsibility: "Design & PR"},
        { img: alissa, name: "Alissa Schulteß", responsibility: "Design, PR"},
        { img: alphar, name: "Alphar Abdugeni", responsibility: "Design, PR"},
        { img: samuel, name: "Samuel Juhasz", responsibility: "HR"},
        { img: bence, name: "Bence Tóth", responsibility: "Finance"},
        { img: nicolas, name: "Nicolas Osipenco", responsibility: "Overnight Stay"},
    ];

    const all = [...orga, ...tutors]
    const aboutUsCards = [];
    
    for (const [idx, tutor] of all.entries()) {
        aboutUsCards.push(<section key={`tutor${idx}`} className="my-2 md:my-8 grid grid-flow-row gap-x-2 gap-y-2 md:gap-y-8">
        <div className="bg-white order-last md:order-first rounded-[3rem] md:rounded-[3rem] overflow-hidden">
            <div className="image-container" style={{ width: '100%', height: '500px', overflow: 'hidden'  }}>
          <img
            src={tutor.img}
            alt=""
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
            <div className="p-8 md:p-12">
                <h2 className="font-medium leading-tight text-2xl md:leading-tight text-black tracking-tight mb-6 ">
                {tutor.name.toUpperCase()}
                </h2>
                <div className="mt-6 text-sm md:text-base font-normal leading-snug md:leading-snug">
                <p className="text-neutral-600">
                    {tutor.responsibility}
                </p>
                </div>
            </div>
        </div>
    </section>)
    }

    return (
        <section className="bg-neutral-200 my-2 md:my-8 rounded-[3rem] md:rounded-[3rem] overflow-hidden">
            <div className="px-8 py-12 md:p-12">
                <p className="mb-1 text-sm md:text-base font-black tracking-wide uppercase text-neutral-600">
                The organizing team
                </p>
                <h2 className="mb-6 text-4xl font-medium leading-2 md:text-6xl md:leading-none tracking-tight text-black">
                Get to know us!
                </h2>
                <div className='grid md:grid-cols-3 md:gap-3 grid-cols-1 gap-1'>
                    {aboutUsCards.slice(0, 3)}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-2'>
                    {aboutUsCards.slice(3)}
                </div>
            </div>
        </section>
    );
}