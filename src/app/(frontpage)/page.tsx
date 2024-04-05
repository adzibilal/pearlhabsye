import Navbar from './_components/navbar'
import Hero from './_components/hero'
import { LandingCarousel } from './_components/landing-carousel'
import Footer from './_components/footer'

export default function Home() {
    return (
        <div className=''>
            <Hero />
            <LandingCarousel />
        </div>
    )
}
