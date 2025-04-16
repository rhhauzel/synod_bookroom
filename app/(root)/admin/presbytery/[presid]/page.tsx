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
  import { supabase } from '@/lib/supabase'
  import toast from 'react-hot-toast'
  import { PastorBialInterface } from '@/db/interface/pastorbial'

  import { useRouter } from 'next/navigation'


const PastorBial = ({params,}:{params:Promise<{presid: string}>}) => {
    const [pastorbial, setPastorBial] = useState<PastorBialInterface[]>([])

    const router = useRouter()

    useEffect(() => {
        fetchPastorBial()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // Fetch Minor Head Data
    async function fetchPastorBial() {
      const presId = (await params).presid
        const { data, error } = await supabase.from('tm_pastor_bial').select('*').filter('pres_code', 'eq', presId)
        
        if(error){
            toast.error(`Failed to fetch data ${error.message}`)
        }else{
          event?.preventDefault()
            setPastorBial(data || [])
        }
    }

    // Click Event
    const hadleClick = (bialcode: string, id: string) => {
      //e.preventDefault()
      router.push(`/admin/presbytery/${bialcode}/${id}`)
    }

  return (
    <div>
        Pastor Bial
        <Table>
        <TableCaption>A list of Pastor Bial..</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Pres Code</TableHead>
            <TableHead>Pres Name</TableHead>
            <TableHead>Bial Code</TableHead>
            <TableHead>Bial Name</TableHead>
            <TableHead className='text-right'>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pastorbial.map((singleData) => (
            <TableRow key={singleData.id} onClick={() => {hadleClick(singleData.pres_code,singleData.bial_code)}}>
              <TableCell className='font-medium'>{singleData.pres_code}</TableCell>
              <TableCell>{singleData.pres_name}</TableCell>
              <TableCell>{singleData.bial_code}</TableCell>
              <TableCell>{singleData.bial_name}</TableCell>
              <TableCell className='text-right'>{ singleData.remarks }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PastorBial