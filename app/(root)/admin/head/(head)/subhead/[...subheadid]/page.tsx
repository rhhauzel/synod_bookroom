'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SubHeadInterface } from '@/db/interface/subhead';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Moment from 'moment'

const SubHead = ({
  params,
}: {
  params: Promise<{ fin_year: string; subheadid: string; minorid: string }>
}) => {
  const [subhead, setSubHead] = useState<SubHeadInterface[]>([])
  
    const router = useRouter()
    
    useEffect(() => {
        fetchSubHead()
      }, [fetchSubHead])

      // Fetch Sub Head Data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchSubHead() {
    const parameters = (await params).subheadid
    const { data, error } = await createClient()
      .from('tm_sub_head')
      .select('*')
      .filter('fin_year', 'eq', parameters[0])
      .filter('major_head_code', 'eq', [parameters[1]])
      .filter('minor_head_code', 'eq', [parameters[2]])

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setSubHead(data || [])
    }
  }

  // Click Event
  const hadleClick = (fin_year: string, major_head_code: string, minor_head_code: string, sub_head_code: string) => {
    //e.preventDefault()
    router.push(`/admin/head/detailhead/${fin_year}/${major_head_code}/${minor_head_code}/${sub_head_code}`)
  }


  return (
    <div>
      Sub Head
      <Table>
        <TableCaption>A list of Sub Head.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Financial Year</TableHead>
            <TableHead>Major Head Code</TableHead>
            <TableHead>Minor Head Code</TableHead>
            <TableHead>Sub Head Code</TableHead>
            <TableHead>Sub Head Description</TableHead>
            <TableHead className='text-right'>Transaction Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subhead.map((singleData) => (
            <TableRow key={singleData.fin_year + '' + singleData.major_head_code + '' + singleData.minor_head_code }>
              <TableCell
                className='font-medium'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code)
                }}
              >
                {singleData.fin_year}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code)
                }}
              >
                {singleData.major_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code)
                }}
              >
                {singleData.minor_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code)
                }}
              >
                {singleData.sub_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code)
                }}
              >
                {singleData.sub_head_description}
              </TableCell>
              <TableCell
                className='text-right'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code)
                }}
              >
                {Moment(singleData.trans_dt.toString()).format('DD-MM-YYYY')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SubHead