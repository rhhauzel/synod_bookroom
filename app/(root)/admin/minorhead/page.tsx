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
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { MinorHeadInterface } from '@/db/interface/minorhead'


const MinorHead = () => {
    const [minorhead, setMinorHead] = useState<MinorHeadInterface[]>([])

    useEffect(() => {
        fetchMinorHead()
    },[])

    // Fetch Minor Head Data
    async function fetchMinorHead() {
        const { data, error } = await supabase.from('tm_minor_head').select('*').filter('fin_year', 'eq', '2013-2014')

        if(error){
            toast.error(`Failed to fetch data ${error.message}`)
        }else{
            setMinorHead(data || [])
        }
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
            <TableRow key={singleData.id}>
              <TableCell className='font-medium'>{singleData.fin_year}</TableCell>
              <TableCell>{singleData.major_head_code}</TableCell>
              <TableCell>{singleData.minor_head_code}</TableCell>
              <TableCell>{singleData.minor_head_description}</TableCell>
              <TableCell className='text-right'>{ singleData.trans_dt.toString() }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  )
}

export default MinorHead