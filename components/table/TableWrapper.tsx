import React from 'react'
import { skeleton } from '@/typings'
import { Button } from '../ui/button'

const TableWrapper = ({skeletonFiles}: {skeletonFiles: skeleton[]}) => {
  return (
    <div>
        <Button>Sort By...</Button>
        {/* Data Table */}
    </div>
  )
}

export default TableWrapper