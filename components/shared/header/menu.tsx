import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EllipsisVertical, UserIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const Menu = () => {
  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <ModeToggle />

        <Button asChild>
          <Link href='/login'>
            <UserIcon />
            Login
          </Link>
        </Button>
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className='flex flex-col item-start'>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <ModeToggle />

            <div className='flex flex-col items-start space-y-2'>
              <Button asChild className='justify-start'>
                <Link href='/login'>
                  <UserIcon />
                  Login
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Menu
