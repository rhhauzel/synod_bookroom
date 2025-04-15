'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_NAME } from "@/lib/constant";
import Image from 'next/image';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Image src='/Images/Logo/VTR.svg' alt={`${APP_NAME} logo`} height={100} width={100} priority={true} />
            <div className="p-6 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold m-4">Page Not Found!</h1>
                <p className="text-destructive">Could not find requested page.</p>
                <Button className="mt-4 ml-2">
                    <Link href="/">Back to the home page</Link>
                </Button>
            </div>
        </div>
    );
}

export default NotFoundPage