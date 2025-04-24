'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Moment from 'moment'
import { ObjectHeadInterface } from '@/db/interface/objecthead';

const ObjectHead = ({
  params,
}: {
  params: Promise<{ fin_year: string; objectid: string; minorid: string,subheadid: string,detailid: string }>
}) => {
  const [objecthead, setObjectHead] = useState<ObjectHeadInterface[]>([])
    
    useEffect(() => {
        fetchObjectHead()
      }, [fetchObjectHead])

      // Fetch Sub Head Data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchObjectHead() {
    const parameters = (await params).objectid
    const detail_head_code = parameters[4]
    const { data, error } = await createClient()
      .from('tm_object_head')
      .select('*')
      .filter('fin_year', 'eq', parameters[0])
      .filter('major_head_code', 'eq', [parameters[1]])
      .filter('minor_head_code', 'eq', [parameters[2]])
      .filter('sub_head_code', 'eq', [parameters[3]])
      .filter('detail_head_code', 'eq', decodeURIComponent(detail_head_code))

    if (error) {
      console.log(error.message)
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setObjectHead(data || [])
    }
  }


  return (
    <div>
      Object Head Code
      <Table>
        <TableCaption>A list of Object Head.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Financial Year</TableHead>
            <TableHead>Major Head Code</TableHead>
            <TableHead>Minor Head Code</TableHead>
            <TableHead>Sub Head Code</TableHead>
            <TableHead>Detail Code</TableHead>
            <TableHead>Object Code</TableHead>
            <TableHead>Object Description</TableHead>
            <TableHead className='text-right'>Transaction Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {objecthead.map((singleData) => (
            <TableRow key={singleData.fin_year + '' + singleData.major_head_code + '' + singleData.minor_head_code + '' + singleData.sub_head_code + '' + singleData.detail_head_code + "" + singleData.object_head_code}>
              <TableCell
                className='font-medium'>
                {singleData.fin_year}
              </TableCell>
              <TableCell>
                {singleData.major_head_code}
              </TableCell>
              <TableCell>
                {singleData.minor_head_code}
              </TableCell>
              <TableCell>
                {singleData.sub_head_code}
              </TableCell>
              <TableCell>
                {singleData.detail_head_code}
              </TableCell>
              <TableCell>
                {singleData.object_head_code}
              </TableCell>
              <TableCell>
                {singleData.object_head_description}
              </TableCell>
              <TableCell
                className='text-right'>
                {Moment(singleData.trans_dt.toString()).format('DD-MM-YYYY')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ObjectHead