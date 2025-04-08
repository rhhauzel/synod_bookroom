import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constant'
import { UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='w-full border-b'>
        <div className="wrapper flex-between">
            <div className="flex-start">
                <Link href="/" className="flex-start">
                    <Image src="/Images/Logo/VTR.svg" alt={`${APP_NAME} logo`} width={48} height={48} priority={true}/>
                </Link>
                <span className='hidden lg:block text-2xl font-bold ml-3'>{APP_NAME}</span>
            </div>
            <div className="space-x-2">
                <Button asChild variant="ghost">
                    <Link href="/login">
                        <UserIcon/>Login
                    </Link>
                </Button>
            </div>
        </div>
    </header>
  )
}

export default Header