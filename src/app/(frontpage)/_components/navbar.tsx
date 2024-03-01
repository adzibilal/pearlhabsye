'use client'
import React, { useState, useEffect } from 'react';
import { CgSearch, CgShoppingBag, CgProfile } from 'react-icons/cg'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;

            if (scrollTop > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`fixed w-full z-20 transition-all duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent !text-white'}`}>
            <div className='max-con min-h-[72px] flex items-center justify-between'>
                <div className='flex items-center gap-10'>
                    <div className={`${isScrolled ? 'text-indigo-700' : 'text-white'} font-bold text-lg`}>
                        PEARLHABSYE
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        <div className="text-sm cursor-pointer px-3 hover:text-indigo-700">Shop</div>
                        <div className="text-sm cursor-pointer px-3 hover:text-indigo-700">Our Story</div>
                        <div className="text-sm cursor-pointer px-3 hover:text-indigo-700">Collaborations</div>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="text-xl cursor-pointer">
                        <CgSearch />
                    </div>
                    <div className="text-xl cursor-pointer">
                        <CgShoppingBag />
                    </div>
                    <div className="text-xl cursor-pointer">
                        <CgProfile />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar