'use client'
import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import toast from 'react-hot-toast'
import { PastorBialInterface } from '@/db/interface/pastorbial'

import { useRouter } from 'next/navigation'
import { PresbyteryInterface } from '@/db/interface/presbytery'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

const PastorBial = ({ params }: { params: Promise<{ presid: string }> }) => {
  const [pastorbial, setPastorBial] = useState<PastorBialInterface[]>([])
  const [presbytery, setPresbytery] = useState<PresbyteryInterface[]>([])

  const router = useRouter()

  useEffect(() => {
    fetchPastorBial()
    fetchSinglePresbytery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch Minor Head Data
  async function fetchPastorBial() {
    const presId = (await params).presid
    const { data, error } = await createClient()
      .from('tm_pastor_bial')
      .select('*')
      .filter('pres_code', 'eq', presId)

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      event?.preventDefault()
      setPastorBial(data || [])
    }
  }

  // Click Event
  const hadleClick = (bialcode: string, id: string) => {
    //e.preventDefault()
    router.push(`/admin/presbytery/${bialcode}/${id}`)
  }

  async function fetchSinglePresbytery() {
    const presID = (await params).presid
    const { data, error } = await createClient()
      .from('tm_presbytery')
      .select('*')
      .eq('pres_code', presID)

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setPresbytery(data || '')
    }
  }

  return (
    <div>
      {presbytery.at(0)?.pres_name} Pastor Bial
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Bial Code</TableHead>
            <TableHead>Bial Hming</TableHead>
            <TableHead className='text-center'>Remarks</TableHead>
            <TableHead className='w-[100px] text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastorbial.map((singleData) => (
            <TableRow
              key={singleData.bial_code}
              onClick={() => {
                hadleClick(singleData.pres_code, singleData.bial_code)
              }}
            >
              <TableCell className='font-medium'>
                {singleData.bial_code}
              </TableCell>
              <TableCell>{singleData.bial_name}</TableCell>
              <TableCell className='text-right'>{singleData.remarks}</TableCell>
              <TableCell className='text-center'>
                <Button variant='outline' size={'sm'} className='mr-1'>
                  <Pencil />
                </Button>
                <Button variant='destructive' size={'sm'} className='ml-1'>
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

export default PastorBial
