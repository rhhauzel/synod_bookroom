'use client'

import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { PresbyteryInterface } from '@/db/interface/presbytery'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

const Presbytery = () => {
  const [presbytery, setPresbytery] = useState<PresbyteryInterface[]>([])
  const [individualPres, setIndividualPres] = useState<PresbyteryInterface[]>(
    []
  )
  const router = useRouter()

  useEffect(() => {
    fetchPresbytery()
  }, [])

  // Fetch Minor Head Data
  async function fetchPresbytery() {
    const { data, error } = await supabase.from('tm_presbytery').select('*')

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setPresbytery(data || [])
    }
  }

  // Click Event
  const hadleClick = (id: string) => {
    //e.preventDefault()
    router.push(`/admin/presbytery/${id}`)
  }

  // Individual Presbytery
  async function getIndividualData(id: string) {
    const { data, error } = await supabase
      .from('tm_presbytery')
      .select('*')
      .eq('id', id)
      .limit(1)

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setIndividualPres(data || '')
    }
  }

  return (
    <div>
      <div className='flex flex-between mb-3'>
        <h1 className='text-3xl font-bold'>Presbytery</h1>
        <Dialog>
          <DialogTrigger asChild>
          <Button className='text-white bg-blue-700'>Add New</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when youre done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='pres_code' className='text-right'>
                  Pres Code
                </Label>
                <Input
                  id='pres_code'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='pres_name' className='text-right'>
                  Pres Name
                </Label>
                <Input
                  id='pres_name'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='remarks' className='text-right'>
                  Remarks
                </Label>
                <Textarea
                  id='remarks'
                  className='col-span-3'
                />
              </div>
            </div>
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
      </div>
      <Separator />
      <Table>
        <TableCaption>A list of Presbytery.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Sl No</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className='text-center'>Remarks</TableHead>
            <TableHead className='w-[100px] text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {presbytery.map((singleData) => (
            <TableRow key={singleData.id}>
              <TableCell
                className='font-medium'
                onClick={() => {
                  hadleClick(singleData.pres_code)
                }}
              >
                {singleData.sl_no}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.pres_code)
                }}
              >
                {singleData.pres_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.pres_code)
                }}
              >
                {singleData.pres_name}
              </TableCell>
              <TableCell
                className='text-left'
                onClick={() => {
                  hadleClick(singleData.pres_code)
                }}
              >
                {singleData.remarks}
              </TableCell>
              <TableCell className='text-center'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
                      size={'sm'}
                      className='mr-1 cursor-pointer'
                      onClick={() => getIndividualData(singleData.id)}
                    >
                      <Pencil />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Edit</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when youre
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='pres_code' className='text-right'>
                          Pres Code
                        </Label>
                        <Input
                          id='pres_code'
                          value={individualPres[0]?.pres_code}
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='pres_name' className='text-right'>
                          Pres Name
                        </Label>
                        <Input
                          id='pres_name'
                          value={individualPres[0]?.pres_name}
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='remarks' className='text-right'>
                          Remarks
                        </Label>
                        <Textarea
                          id='remarks'
                          value={individualPres[0]?.remarks}
                          className='col-span-3'
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type='submit'>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant='destructive'
                  size={'sm'}
                  className='ml-1 cursor-pointer'
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Presbytery
