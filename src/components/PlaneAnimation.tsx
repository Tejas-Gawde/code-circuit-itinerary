"use client"

import { useEffect, useState, useCallback, memo } from 'react'
import plane1 from '@/assets/svgs/svg1.svg'
import plane2 from '@/assets/svgs/svg2.svg'
import plane3 from '@/assets/svgs/svg3.svg'

interface Plane {
    id: string
    x: number
    y: number
    scale: number
    rotation: number
    speed: number
    type: number
    direction: 'horizontal' | 'vertical'
}

// Constants outside component to prevent recreations
const PLANE_DENSITY = 4
const SPAWN_INTERVAL = 3000
const VIEWPORT_BUFFER = 200
const MIN_SCALE = 0.5  // Increased minimum scale
const MAX_SCALE = 1  // Increased maximum scale
const PLANE_SVGS = [plane1, plane2, plane3] as const

// Memoized Plane component for better performance
const PlaneElement = memo(({ plane }: { plane: Plane }) => (
    <div
        className="absolute"
        style={{
            transform: `translate(${plane.x}px, ${plane.y}px) scale(${plane.scale}, ${plane.type === 2 && plane.rotation === 180 ? -plane.scale : plane.scale
                }) rotate(${plane.rotation}deg)`,
            transition: 'transform 16ms linear'
        }}
    >
        <img
            src={PLANE_SVGS[plane.type].src}
            alt=""
            className="w-12 h-12 svg-light-purple"
        />
    </div>
))
PlaneElement.displayName = 'PlaneElement'

export function PlaneAnimation() {
    const [planes, setPlanes] = useState<Plane[]>([])

    // Memoized plane creation function
    const createPlane = useCallback(() => {
        const type = Math.floor(Math.random() * PLANE_SVGS.length)
        // Force horizontal direction for plane3 (type === 2)
        const direction: 'horizontal' | 'vertical' = type === 2
            ? 'horizontal'
            : (Math.random() > 0.5 ? 'horizontal' : 'vertical')
        const isPositiveDirection = Math.random() > 0.5

        let x, y, rotation;
        if (direction === 'horizontal') {
            x = isPositiveDirection ? -100 : window.innerWidth + 100
            y = Math.random() * window.innerHeight
            rotation = isPositiveDirection ? 0 : 180
        } else {
            x = Math.random() * window.innerWidth
            y = isPositiveDirection ? -100 : window.innerHeight + 100
            rotation = isPositiveDirection ? 90 : 270
        }

        return {
            id: `plane_${Date.now()}_${Math.random()}`,
            x,
            y,
            scale: MIN_SCALE + Math.random() * (MAX_SCALE - MIN_SCALE), // More controlled scale range
            rotation,
            speed: 1 + Math.random() * 2,
            type,
            direction
        }
    }, [])

    // Animation setup using requestAnimationFrame
    useEffect(() => {
        // Create initial planes
        setPlanes(Array.from({ length: PLANE_DENSITY }, createPlane))

        let animationFrameId: number
        let lastSpawnTime = Date.now()

        const animate = () => {
            const now = Date.now()

            // Spawn new planes at interval
            if (now - lastSpawnTime > SPAWN_INTERVAL / PLANE_DENSITY) {
                setPlanes(prev => [...prev, createPlane()])
                lastSpawnTime = now
            }

            // Update plane positions
            setPlanes(prev =>
                prev.map(plane => {
                    const newX = plane.direction === 'horizontal'
                        ? (plane.rotation === 0 ? plane.x + plane.speed : plane.x - plane.speed)
                        : plane.x
                    const newY = plane.direction === 'vertical'
                        ? (plane.rotation === 90 ? plane.y + plane.speed : plane.y - plane.speed)
                        : plane.y

                    return { ...plane, x: newX, y: newY }
                }).filter(plane =>
                    plane.x > -VIEWPORT_BUFFER &&
                    plane.x < window.innerWidth + VIEWPORT_BUFFER &&
                    plane.y > -VIEWPORT_BUFFER &&
                    plane.y < window.innerHeight + VIEWPORT_BUFFER
                )
            )

            animationFrameId = requestAnimationFrame(animate)
        }

        animationFrameId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [createPlane])

    return (
        <div className="fixed inset-0 -z-10 w-full h-full">
            {planes.map(plane => (
                <PlaneElement key={plane.id} plane={plane} />
            ))}
        </div>
    )
}