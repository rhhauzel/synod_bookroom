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

const MinorHead = ({
  params,
}: {
  params: Promise<{ fin_year: string; majorid: string }>
}) => {
  const [minorhead, setMinorHead] = useState<MinorHeadInterface[]>([])

  const router = useRouter()

  useEffect(() => {
    fetchMinorHead()
  }, [])

  // Fetch Minor Head Data
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
  const hadleClick = (id: string) => {
    //e.preventDefault()
    router.push(`/admin/presbytery/${id}`)
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
              <TableCell
                className='font-medium'
                onClick={() => {
                  hadleClick(singleData.id)
                }}
              >
                {singleData.fin_year}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.id)
                }}
              >
                {singleData.major_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.id)
                }}
              >
                {singleData.minor_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.id)
                }}
              >
                {singleData.minor_head_description}
              </TableCell>
              <TableCell
                className='text-right'
                onClick={() => {
                  hadleClick(singleData.id)
                }}
              >
                {singleData.trans_dt.toString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MinorHead
