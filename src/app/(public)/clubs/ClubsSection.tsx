"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_CLUBS } from "./data";
import { Users, BookOpen } from "lucide-react";
import { motion, type Variants } from "framer-motion";

export default function ClubsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight"
          >
            Join Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Vibrant Book Clubs
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400"
          >
            Connect with fellow readers, discover new genres, and deepen your
            love for literature in our active and welcoming community.
          </motion.p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {MOCK_CLUBS.slice(0, 3).map((club) => (
            <motion.div
              key={club.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative w-full h-48">
                <Image
                  src={club.image}
                  alt={club.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-sm font-bold py-1 px-3 rounded-full">
                  {club.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {club.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {club.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-5">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{club.members} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Reading: {club.currentBook.title}</span>
                  </div>
                </div>
                <Link href={`/clubs/${club.id}`} passHref>
                  <Button className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white">
                    View Club
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-16">
          <Link href="/clubs" passHref>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold border-2 border-gray-300 dark:border-gray-700 backdrop-blur-sm transform hover:scale-105 transition-transform"
            >
              Explore All Clubs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
