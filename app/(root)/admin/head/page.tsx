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
import { MajorHeadInterface } from '@/db/interface/majorhead'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'
import Moment from 'moment'
import { useRouter } from 'next/navigation'

const MajorHead = () => {
  Moment.locale('en')

  const [majorhead, setMajorHead] = useState<MajorHeadInterface[]>([])

  const router = useRouter()

  useEffect(() => {
    fetchMajorHead()
  }, [])

  // Fetch Major Head Data
  async function fetchMajorHead() {
    const { data, error } = await createClient()
      .from('tm_major_head')
      .select('*')
      .order('fin_year', { ascending: false })

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setMajorHead(data || [])
    }
  }

  // Click Event
  const hadleClick = (fin_year: string, major_head_code: string) => {
    //e.preventDefault()
    router.push(`/admin/head/minorhead/${fin_year}/${major_head_code}`)
  }

  return (
    <div>
      Major Head
      <Table>
        <TableCaption>A list of Major Head.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Financial Year</TableHead>
            <TableHead>Major Head Code</TableHead>
            <TableHead>Major Head Description</TableHead>
            <TableHead className='text-right'>Transaction Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {majorhead.map((singleData) => (
            <TableRow
              key={singleData.fin_year + '' + singleData.major_head_code}
            >
              <TableCell
                className='font-medium'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code)
                }}
              >
                {singleData.fin_year}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code)
                }}
              >
                {singleData.major_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code)
                }}
              >
                {singleData.major_head_description}
              </TableCell>
              <TableCell
                className='text-right'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.major_head_code)
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

export default MajorHead
