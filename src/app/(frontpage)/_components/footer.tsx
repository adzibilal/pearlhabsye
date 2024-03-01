import React from 'react'
import {BsTiktok, BsInstagram, BsYoutube, BsFacebook} from 'react-icons/bs'

const Footer = () => {
    return (
        <div className='bg-muted'>
            <div className='max-con !py-5 flex items-center justify-between'>
                <div className=''>
                    <div className={`text-indigo-700 font-bold text-lg`}>
                        PEARLHABSYE
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-muted-foreground cursor-pointer">
                        <BsInstagram />
                    </div>
                    <div className="text-muted-foreground cursor-pointer">
                        <BsTiktok />
                    </div>
                    <div className="text-muted-foreground cursor-pointer">
                        <BsYoutube />
                    </div>
                    <div className="text-muted-foreground cursor-pointer">
                        <BsFacebook />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
