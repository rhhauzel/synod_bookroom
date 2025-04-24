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

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'
import { ObjectHeadInterface } from '@/db/interface/objecthead'

const ObjectHead = () => {
  const [objecthead, setObjectHead] = useState<ObjectHeadInterface[]>([])

  useEffect(() => {
    fetchObjectHead()
  }, [])

  // Fetch Minor Head Data
  async function fetchObjectHead() {
    const { data, error } = await createClient()
      .from('tm_object_head')
      .select('*')
      .filter('fin_year', 'eq', '2013-2014')

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setObjectHead(data || [])
    }
  }
  return (
    <div>
      Object Head
      <Table>
        <TableCaption>A list of Object Head.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Financial Year</TableHead>
            <TableHead>Major Head Code</TableHead>
            <TableHead>Minor Head Code</TableHead>
            <TableHead>Minor Head Description</TableHead>
            <TableHead className='text-right'>Transaction Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {objecthead.map((singleData) => (
            <TableRow key={singleData.id}>
              <TableCell className='font-medium'>
                {singleData.fin_year}
              </TableCell>
              <TableCell>{singleData.major_head_code}</TableCell>
              <TableCell>{singleData.minor_head_code}</TableCell>
              <TableCell>{singleData.sub_head_code}</TableCell>
              <TableCell>{singleData.detail_head_code}</TableCell>
              <TableCell>{singleData.object_head_description}</TableCell>
              <TableCell className='text-right'>
                {singleData.trans_dt.toString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ObjectHead
