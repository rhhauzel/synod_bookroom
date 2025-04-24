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
import { useRouter } from 'next/navigation'
import Moment from 'moment'
import { ReceiptObjectInterface } from '@/db/interface/receiptobject'

const ReceiptObject = ({
  params,
}: {
  params: Promise<{ fin_year: string; objectid: string, rct_detail_code: string }>
}) => {
  const [receiptobject, setReceiptObject] = useState<ReceiptObjectInterface[]>([])

  const router = useRouter()

  useEffect(() => {
    fetchObjectHead()
  }, [fetchObjectHead])

  // Fetch Minor Head Data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchObjectHead() {
    const parameters = (await params).objectid
    const rct_detail_code = parameters[2]
    const { data, error } = await createClient()
      .from('tm_receipt_object')
      .select('*')
      .filter('fin_year', 'eq', parameters[0])
      .filter('receipt_head_code', 'eq', [parameters[1]])
      .filter('rct_detail_head_code', 'eq', decodeURIComponent(rct_detail_code))

    if (error) {
      toast.error(`Failed to fetch data ${error.message}`)
    } else {
      setReceiptObject(data || [])
    }
  }

  // Click Event
  const hadleClick = (fin_year: string, receipt_head_code: string, rct_detail_head_code: string) => {
    //e.preventDefault()
    router.push(`/admin/receipt/receiptobject/${fin_year}/${receipt_head_code}/${rct_detail_head_code}`)
  }

  return (
    <div>
      Receipt Details
      <Table>
        <TableCaption>A list of Receipt Details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Financial Year</TableHead>
            <TableHead>Receipt Head Code</TableHead>
            <TableHead>Receipt Detail Code</TableHead>
            <TableHead>Receipt Detail Description</TableHead>
            <TableHead className='text-right'>Transaction Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {receiptobject.map((singleData) => (
            <TableRow key={singleData.fin_year + '' + singleData.receipt_head_code + '' + singleData.rct_detail_head_code + '' + singleData.rct_object_head_code}>
              <TableCell
                className='font-medium'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code, singleData.rct_detail_head_code)
                }}
              >
                {singleData.fin_year}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code, singleData.rct_detail_head_code)
                }}
              >
                {singleData.receipt_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code, singleData.rct_detail_head_code)
                }}
              >
                {singleData.rct_detail_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code, singleData.rct_detail_head_code)
                }}
              >
                {singleData.rct_detail_head_description}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code, singleData.rct_detail_head_code)
                }}
              >
                {singleData.rct_object_head_code}
              </TableCell>
              <TableCell
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code, singleData.rct_detail_head_code)
                }}
              >
                {singleData.rct_object_head_description}
              </TableCell>
              <TableCell
                className='text-right'
                onClick={() => {
                  hadleClick(singleData.fin_year, singleData.receipt_head_code, singleData.rct_detail_head_code)
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

export default ReceiptObject
