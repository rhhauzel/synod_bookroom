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
  import { supabase } from '@/lib/supabase'
  import toast from 'react-hot-toast'
  import { KohhranInterface } from '@/db/interface/kohhran'
import { PastorBialInterface } from '@/db/interface/pastorbial'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'


const Kohhran = ({params,}:{params:Promise<{bialid: string}>}) => {
    const [kohhran, setKohhran] = useState<KohhranInterface[]>([])
    const [bial, setBial] = useState<PastorBialInterface[]>([])

    

    useEffect(() => {
        fetchKohhran()
        fetchSingleBial()
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
    
    async function fetchSingleBial(){
      const bialId = (await params).bialid
      const { data, error } = await supabase.from('tm_pastor_bial').select("*").eq('bial_code', bialId)

      if(error){
        toast.error(`Failed to fetch data ${error.message}`)
      }else{
        setBial(data || '')
      }
    }

  return (
    <div>
        { bial.at(0)?.bial_name } Pastor Bial List
        
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Kohhran Code</TableHead>
            <TableHead>Kohhran Name</TableHead>
            <TableHead className='w-[100px]'>Dan Zawhkim</TableHead>
            <TableHead className='text-center'>Remarks</TableHead>
            <TableHead className='w-[100px] text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kohhran.map((singleData) => (
            <TableRow key={singleData.kohhran_code}>
              <TableCell className='font-medium'>{singleData.kohhran_code}</TableCell>
              <TableCell>{singleData.kohhran_name}</TableCell>
              <TableCell className='text-right'>{singleData.dan_zawhkim}</TableCell>
              <TableCell className='text-left'>{ singleData.remarks }</TableCell>
              <TableCell className='text-center'>
                <Button variant='outline' size={'sm'} className='mr-1'><Pencil/></Button>
                <Button variant='destructive' size={'sm'} className='ml-1'><Trash2/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Kohhran