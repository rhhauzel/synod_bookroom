'use client'

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
import { MinorHeadInterface } from '@/db/interface/minorhead'
import { useRouter } from 'next/navigation'
import Moment from 'moment'

const MinorHead = ({
  params,
}: {
  params: Promise<{ fin_year: string; majorid: string }>
}) => {
  const [minorhead, setMinorHead] = useState<MinorHeadInterface[]>([])

  const router = useRouter()

  useEffect(() => {
    fetchMinorHead()
  }, [fetchMinorHead])

  // Fetch Minor Head Data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchMinorHead() {
    const parameters = (await params).majorid
    const { data, error } = await createClient()
      .from('tm_minor_head')
      .select('*')
      .filter('fin_year', 'eq', parameters[0])
      .filter('major_head_code', 'eq', [parameters[1]])

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setMinorHead(data || [])
    }
  }

  // Click Event
  const hadleClick = (fin_year: string, major_head_code: string, minor_head_code: string) => {
    //e.preventDefault()
    router.push(`/admin/head/subhead/${fin_year}/${major_head_code}/${minor_head_code}`)
  }

  return (
    <div>
      Minor Head
      <Table>
        <TableCaption>A list of Minor Head.</TableCaption>
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
          {minorhead.map((singleData) => (
            <TableRow key={singleData.fin_year + '' + singleData.major_head_code + '' + singleData.minor_head_code }>
              <TableCell
                className='font-medium'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code)
                }}
              >
                {singleData.fin_year}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code)
                }}
              >
                {singleData.major_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code)
                }}
              >
                {singleData.minor_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code)
                }}
              >
                {singleData.minor_head_description}
              </TableCell>
              <TableCell
                className='text-right'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code, singleData.minor_head_code)
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

export default MinorHead
