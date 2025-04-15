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
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

const MajorHead = () => {
  const [majorhead, setMajorHead] = useState<MajorHeadInterface[]>([])

  useEffect(() => {
    fetchMajorHead()
  }, [])

  // Fetch Major Head Data
  async function fetchMajorHead() {
    const { data, error } = await supabase.from('tm_major_head').select('*').filter('fin_year', 'eq', '2013-2014')

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setMajorHead(data || [])
    }
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
            <TableRow key={singleData.id}>
              <TableCell className='font-medium'>{singleData.fin_year}</TableCell>
              <TableCell>{singleData.major_head_code}</TableCell>
              <TableCell>{singleData.major_head_description}</TableCell>
              <TableCell className='text-right'>{ singleData.trans_dt.toString() }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MajorHead
