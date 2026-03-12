"use client";

import * as React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { featuredBooks } from "./data";
import { Book } from "@/types/book";

export function FeaturedBooks() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {featuredBooks.map((book: Book) => (
          <CarouselItem key={book.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="relative aspect-[2/3] p-0">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </CardContent>
                <CardFooter className="flex-col items-start p-4">
                    <p className="text-lg font-semibold">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}