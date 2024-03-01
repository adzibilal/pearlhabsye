import Navbar from './_components/navbar'
import Hero from './_components/hero'
import { LandingCarousel } from './_components/landing-carousel'

export default function Home() {
    return (
        <div className=''>
            <Navbar />
            <Hero />
            <LandingCarousel />
        </div>
    )
}
