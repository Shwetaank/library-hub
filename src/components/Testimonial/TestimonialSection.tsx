"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "./data";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialSection = () => {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="section-kicker">Reader Feedback</div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-title mt-6"
          >
            What our readers and librarians are saying.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-copy mt-5 !text-lg"
          >
            We're proud to have the support of a growing community of happy users.
          </motion.p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <Card className="ui-card-elevated h-full overflow-hidden rounded-[1.8rem] border-border/70 bg-card/96">
                    <CardContent className="flex h-full flex-col p-8">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                              className="h-5 w-5 text-amber-500"
                            fill="currentColor"
                          />
                        ))}
                        </div>
                        <Quote className="h-5 w-5 text-primary/60" />
                      </div>
                      <p className="flex-grow text-base leading-8 text-muted-foreground">
                        &ldquo;{testimonial.message}&rdquo;
                      </p>
                      <div className="mt-8 flex items-center">
                        <Avatar className="mr-4 h-12 w-12 border-2 border-primary/20">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold tracking-[-0.03em] text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-[-18px] border-border/70 bg-card text-foreground shadow-sm" />
          <CarouselNext className="right-[-18px] border-border/70 bg-card text-foreground shadow-sm" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
