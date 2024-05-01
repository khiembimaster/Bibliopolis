import * as React from "react"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "../ui/button"

export default function Homepage() {
  return (
    <div className="grid grid-rows-3">
      <div className="min-h-screen bg-[url('/image/image.png')] bg-center bg-cover">
        <div className="text-white mt-40 ms-10">
          <h1 className="text-6xl font-semibold leading-normal">Welcome</h1> 
          <h2 className="text-2xl font-semibold leading-normal">Quick shopping within 15 minutes</h2>
          <p className="mt-2">
            Bibliopolis will provide you with an extremely comfortable <br /> 
            book buying service experience with almost all famous books in the world.
          </p>
          <Link href="/products">
              <Button className="mt-10 bg-yellow-500 text-white hover:text-yellow-500 hover:bg-white px-6 py-3 rounded-lg">
                Buy now
              </Button>
          </Link>
          


        </div>
      </div>
    </div>
  )
}
