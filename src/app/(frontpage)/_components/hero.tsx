import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div className='relative overflow-hidden'>
            <div className='gradient-top w-full h-52 bg-gradient-to-b from-black/80 to-transparent absolute top-0'></div>
            <Image
                src='/images/hero.jpg'
                width={1920}
                height={1920}
                alt=''
                className='w-screen h-screen object-cover'
            />
            <div className='gradient-bottom w-full h-52 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0'></div>
            <div className='max-con z-10 w-full h-full absolute top-0 translate-x-[-50%] left-[50%]'>
                <div className='absolute bottom-10'>
                    <div className="mb-3 text-white">
                        Pearl Habsye Blessed Circle <br />
                        Collections 2024
                    </div>
                    <div className='px-16 py-2 text-white border border-white rounded-[50%] cursor-pointer hover:shadow-lg hover:shadow-white/30'>
                        Shop Now
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
