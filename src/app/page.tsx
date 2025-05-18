import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { PlaneAnimation } from '@/components/PlaneAnimation'

export default function page() {
  return (
    <>
      <AnimatedBackground />
      <PlaneAnimation />
      <div className='h-[90vh] w-screen flex flex-col items-center justify-center gap-8 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]'>
        <div className="space-y-4 text-center mb-5">
          <span className="text-2xl font-semibold bg-gradient-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent inline-block">
            Drag, Drop, Discover
          </span>
          <h1 className='text-4xl font-bold'>Itinerary Planning Made Easy</h1>
        </div>

        <Link
          href="/edit"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary/50 p-[4px] transition-all hover:bg-gradient-to-b hover:shadow-lg hover:shadow-primary/50"
        >
          <span className="relative inline-flex h-full items-center gap-2 rounded-full bg-background px-8 py-4 text-lg font-medium transition-all duration-300 group-hover:bg-transparent group-hover:text-white">
            Get Started for free
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </>
  )
}
