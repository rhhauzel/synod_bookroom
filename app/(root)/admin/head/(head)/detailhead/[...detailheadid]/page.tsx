'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Moment from 'moment'
import { DetailHeadInterface } from '@/db/interface/detailhead';

const DetailHead = ({
  params,
}: {
  params: Promise<{ fin_year: string; detailheadid: string; minorid: string,subheadid: string }>
}) => {
  const [detailhead, setDetailHead] = useState<DetailHeadInterface[]>([])
  
    const router = useRouter()
    
    useEffect(() => {
        fetchDetailHead()
      }, [fetchDetailHead])

      // Fetch Sub Head Data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchDetailHead() {
    const parameters = (await params).detailheadid
    const { data, error } = await createClient()
      .from('tm_detail_head')
      .select('*')
      .filter('fin_year', 'eq', parameters[0])
      .filter('major_head_code', 'eq', [parameters[1]])
      .filter('minor_head_code', 'eq', [parameters[2]])
      .filter('sub_head_code', 'eq', [parameters[3]])

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setDetailHead(data || [])
    }
  }

  // Click Event
  const hadleClick = (fin_year: string, major_head_code: string, minor_head_code: string, sub_head_code: string, detail_head_code: string) => {
    //e.preventDefault()
    router.push(`/admin/head/objecthead/${fin_year}/${major_head_code}/${minor_head_code}/${sub_head_code}/${detail_head_code}`)
  }


  return (
    <div>
      Minor Head
      <Table>
        <TableCaption>A list of Detail Head.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Financial Year</TableHead>
            <TableHead>Major Head Code</TableHead>
            <TableHead>Minor Head Code</TableHead>
            <TableHead>Sub Head Code</TableHead>
            <TableHead>Detail Code</TableHead>
            <TableHead>Detail Description</TableHead>
            <TableHead className='text-right'>Transaction Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {detailhead.map((singleData) => (
            <TableRow key={singleData.fin_year + '' + singleData.major_head_code + '' + singleData.minor_head_code + '' + singleData.sub_head_code + '' + singleData.detail_head_code}>
              <TableCell
                className='font-medium'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code,singleData.detail_head_code)
                }}
              >
                {singleData.fin_year}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code,singleData.detail_head_code)
                }}
              >
                {singleData.major_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code,singleData.detail_head_code)
                }}
              >
                {singleData.minor_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code,singleData.detail_head_code)
                }}
              >
                {singleData.sub_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code,singleData.detail_head_code)
                }}
              >
                {singleData.detail_head_code}
              </TableCell>
              <TableCell
                className='text-right'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code,singleData.detail_head_code)
                }}
              >
                {singleData.detail_head_description}
              </TableCell>
              <TableCell
                className='text-right'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code,singleData.sub_head_code,singleData.detail_head_code)
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

export default DetailHead