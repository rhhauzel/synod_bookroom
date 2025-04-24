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
import Moment from 'moment'
import { useRouter } from 'next/navigation'
import { ReceiptHeadInterface } from '@/db/interface/receipthead'

const ReceiptHead = () => {
  Moment.locale('en')

  const [receipthead, setReceiptHead] = useState<ReceiptHeadInterface[]>([])

  const router = useRouter()

  useEffect(() => {
    fetchReceiptHead()
  }, [])

  // Fetch Major Head Data
  async function fetchReceiptHead() {
    const { data, error } = await createClient()
      .from('tm_receipt_head')
      .select('*')
      .order('fin_year', { ascending: false })

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setReceiptHead(data || [])
    }
  }

  // Click Event
  const hadleClick = (fin_year: string, major_head_code: string) => {
    //e.preventDefault()
    router.push(`/admin/receipt/receiptdetail/${fin_year}/${major_head_code}`)
  }

  return (
    <div>
      Receipt Head
      <Table>
        <TableCaption>A list of Receipt Head.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Financial Year</TableHead>
            <TableHead>Receipt Head Code</TableHead>
            <TableHead>Receipt Head Description</TableHead>
            <TableHead className='text-right'>Transaction Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receipthead.map((singleData) => (
            <TableRow
              key={singleData.fin_year + '' + singleData.receipt_head_code}
            >
              <TableCell
                className='font-medium'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code)
                }}
              >
                {singleData.fin_year}
              </TableCell>
              <TableCell
                className='text-center'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code)
                }}
              >
                {singleData.receipt_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code)
                }}
              >
                {singleData.receipt_head_description}
              </TableCell>
              <TableCell
                className='text-right'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code)
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

export default ReceiptHead
