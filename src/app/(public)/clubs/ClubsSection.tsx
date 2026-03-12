import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_CLUBS } from './data';

export function ClubsSection() {
  const clubsToShow = MOCK_CLUBS.slice(0, 3);

  return (
    <div className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Find Your Community</h2>
            <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">Join a book club that fits your interests.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubsToShow.map((club) => (
            <Card key={club.id} className="overflow-hidden">
                <CardHeader className="p-0">
                    <div className="relative aspect-video">
                        <Image
                        src={club.image}
                        alt={club.name}
                        fill
                        className="object-cover"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <CardTitle className="mb-2">{club.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {club.description}
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                        <Link href={`/clubs/${club.id}`}>Learn More</Link>
                    </Button>
                </CardContent>
            </Card>
            ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/clubs">View All Clubs</Link>
            </Button>
        </div>
    </div>
  );
}