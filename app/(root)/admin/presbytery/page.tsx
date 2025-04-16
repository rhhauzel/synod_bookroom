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
  import { PresbyteryInterface } from '@/db/interface/presbytery'

  import { useRouter } from 'next/navigation'

const Presbytery = () => {
    const [presbytery, setPresbytery] = useState<PresbyteryInterface[]>([])
    const router = useRouter();

    useEffect(() => {
        fetchPresbytery()
    },[])

    // Fetch Minor Head Data
    async function fetchPresbytery() {
        const { data, error } = await supabase.from('tm_presbytery').select('*')

        if(error){
            toast.error(`Failed to fetch data ${error.message}`)
        }else{
            setPresbytery(data || [])
        }
    }

    // Click Event
    const hadleClick = (id: string) => {
      //e.preventDefault()
      router.push(`/admin/presbytery/${id}`)
    }
    
  return (
    <div>
        Presbytery
        <Table>
        <TableCaption>A list of Presbytery.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Sl No</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className='text-right'>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {presbytery.map((singleData) => (
            <TableRow key={singleData.id} onClick={() => {hadleClick(singleData.pres_code)}}>
              <TableCell className='font-medium'>{singleData.sl_no}</TableCell>
              <TableCell>{singleData.pres_code}</TableCell>
              <TableCell>{singleData.pres_name}</TableCell>
              <TableCell className='text-right'>{ singleData.remarks }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Presbytery