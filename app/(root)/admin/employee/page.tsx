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
import { EmployeeInterface } from '@/db/interface/employee'

const EmployeePage = () => {
  Moment.locale('en')

  const [employee, setEmployee] = useState<EmployeeInterface[]>([])
  const [editempolyee, setEditEmployee] = useState<EmployeeInterface[]>([])

  useEffect(() => {
    fetchEmployee()
  }, [])

  // Fetch Major Head Data
  async function fetchEmployee() {
    const { data, error } = await createClient()
      .from('tm_employee')
      .select('*')
      .order('emp_cd', { ascending: true })
    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setEmployee(data || [])
    }
  }

  // Individual Presbytery
  async function getEmployee(id: string) {
    const { data, error } = await createClient()
      .from('tm_employee')
      .select('*')
      .eq('emp_cd', id)
      .limit(1)

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setEditEmployee(data || '')
    }
  }

  return (
    <div>
      <div className='flex flex-between mb-3'>
        <h1 className='text-3xl font-bold'>Employee</h1>
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
            <TableHead className='w-[100px]'>Name</TableHead>
            <TableHead>Date of Joining</TableHead>
            <TableHead>CPF No</TableHead>
            <TableHead>Basic Pay</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Thawhna Hmun</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead className='text-right'>Transaction Date</TableHead>
            <TableHead className='w-[100px] text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employee.map((singleData) => (
            <TableRow key={singleData.emp_cd}>
              <TableCell>{singleData.emp_name}</TableCell>
              <TableCell>{Moment(singleData.doj_synod.toString()).format('DD-MM-YYYY')}</TableCell>
              <TableCell>{singleData.cpf_acct_no}</TableCell>
              <TableCell>{singleData.basic_pay}</TableCell>
              <TableCell>{singleData.designation}</TableCell>
              <TableCell>{singleData.thawhna_hmun}</TableCell>
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
                      onClick={() => getEmployee(singleData.scale_cd)}
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
                          value={editempolyee[0]?.emp_name}
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='pres_name' className='text-right'>
                          Designation Details
                        </Label>
                        <Input
                          id='pres_name'
                          value={editempolyee[0]?.designation}
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='remarks' className='text-right'>
                          Remarks
                        </Label>
                        <Textarea
                          id='remarks'
                          value={editempolyee[0]?.remarks}
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

export default EmployeePage
