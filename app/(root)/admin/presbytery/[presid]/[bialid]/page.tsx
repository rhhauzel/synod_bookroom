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
  import { KohhranInterface } from '@/db/interface/kohhran'


const Kohhran = ({params,}:{params:Promise<{bialid: string}>}) => {
    const [kohhran, setKohhran] = useState<KohhranInterface[]>([])

    

    useEffect(() => {
        fetchKohhran()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // Fetch Minor Head Data
    async function fetchKohhran() {
      const bialId = (await params).bialid
        const { data, error } = await supabase.from('tm_kohhran').select('*').filter('bial_code', 'eq', bialId)
        
        if(error){
            toast.error(`Failed to fetch data ${error.message}`)
        }else{
            setKohhran(data || [])
        }
    }
  return (
    <div>
        Kohhran
        <Table>
        <TableCaption>A list of Pastor Bial..</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Bial Code</TableHead>
            <TableHead>Bial Name</TableHead>
            <TableHead>Kohhran Code</TableHead>
            <TableHead>Kohhran Name</TableHead>
            <TableHead>Dan Zawhkim</TableHead>
            <TableHead className='text-right'>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kohhran.map((singleData) => (
            <TableRow key={singleData.kohhran_code}>
              <TableCell className='font-medium'>{singleData.bial_code}</TableCell>
              <TableCell>{singleData.bial_name}</TableCell>
              <TableCell>{singleData.kohhran_code}</TableCell>
              <TableCell>{singleData.kohhran_name}</TableCell>
              <TableCell className='text-right'>{singleData.dan_zawhkim}</TableCell>
              <TableCell className='text-right'>{ singleData.remarks }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Kohhran