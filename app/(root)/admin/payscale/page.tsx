'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Moment from 'moment'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { PayScaleInterface } from '@/db/interface/payscale'

const PayScalePage = () => {
  Moment.locale('en')

  const [payscale, setPayScale] = useState<PayScaleInterface[]>([])
  const [indpayscale, setIndPayScale] = useState<PayScaleInterface[]>([])

  useEffect(() => {
    fetchPayScale()
  }, [])

  // Fetch Major Head Data
  async function fetchPayScale() {
    const { data, error } = await createClient()
      .from('tm_scale')
      .select('*')
      .order('scale_cd', { ascending: true })
    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setPayScale(data || [])
    }
  }

  // Individual Presbytery
  async function getPayScale(id: string) {
    const { data, error } = await createClient()
      .from('tm_scale')
      .select('*')
      .eq('scale_cd', id)
      .limit(1)

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setIndPayScale(data || '')
    }
  }

  return (
    <div>
      <div className='flex flex-between mb-3'>
        <h1 className='text-3xl font-bold'>Designation</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='text-white bg-blue-700'>Add New</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[720px]'>
            <DialogHeader>
              <DialogTitle>Edit</DialogTitle>
              <DialogDescription>
                He <span className='font-bold'>Popup</span> hmang hian{' '}
                <span className='font-bold'>Designation</span> thar siam tur a
                ni e.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='pres_code' className='text-right'>
                  Designation Code
                </Label>
                <Input id='pres_code' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='pres_name' className='text-right'>
                  Designation Name
                </Label>
                <Input id='pres_name' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='remarks' className='text-right'>
                  Remarks
                </Label>
                <Textarea id='remarks' className='col-span-3' />
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
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Pay Scale Code</TableHead>
            <TableHead>Minimum Pay</TableHead>
            <TableHead>Mid Pay</TableHead>
            <TableHead>Maximum Pay</TableHead>
            <TableHead>Increment</TableHead>
            <TableHead>EB</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead className='text-right'>Transaction Date</TableHead>
            <TableHead className='w-[100px] text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payscale.map((singleData) => (
            <TableRow key={singleData.scale_cd}>
              <TableCell>{singleData.scale_cd}</TableCell>
              <TableCell>{singleData.minimum_pay}</TableCell>
              <TableCell>{singleData.mid_pay}</TableCell>
              <TableCell>{singleData.maximum_pay}</TableCell>
              <TableCell>{singleData.incr_before_mid}</TableCell>
              <TableCell>{singleData.eb}</TableCell>
              <TableCell>{singleData.remarks}</TableCell>
              <TableCell className='text-right'>
                {Moment(singleData.trans_dt.toString()).format('DD-MM-YYYY')}
              </TableCell>
              <TableCell className='text-center'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
                      size={'sm'}
                      className='mr-1 cursor-pointer'
                      onClick={() => getPayScale(singleData.scale_cd)}
                    >
                      <Pencil />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[720px]'>
                    <DialogHeader>
                      <DialogTitle>Edit</DialogTitle>
                      <DialogDescription>
                        He <span className='font-bold'>Popup</span> hmang hian{' '}
                        <span className='font-bold'>Designation</span> siamthat theih a ni e.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='designation_cd' className='text-right'>
                          Designation Code
                        </Label>
                        <Input
                          id='designation_cd'
                          value={indpayscale[0]?.scale_cd}
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='pres_name' className='text-right'>
                          Designation Details
                        </Label>
                        <Input
                          id='pres_name'
                          value={indpayscale[0]?.minimum_pay}
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='remarks' className='text-right'>
                          Remarks
                        </Label>
                        <Textarea
                          id='remarks'
                          value={indpayscale[0]?.remarks}
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

export default PayScalePage
