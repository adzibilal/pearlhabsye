import Image from 'next/image'
import { ThemeToggle } from '../components/theme-toggle'
import Navbar from './_components/navbar'
import Hero from './_components/hero'
import { LandingCarousel } from './_components/landing-carousel'

export default function Home() {
    return (
        <div className=''>
            <Navbar />
            <Hero />
            <LandingCarousel />
            {/* <ThemeToggle /> */}
        </div>
    )
}
