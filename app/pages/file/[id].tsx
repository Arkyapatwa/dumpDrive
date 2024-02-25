import React from 'react'
import { useRouter } from 'next/router'

const FilePage = () => {
    const router  = useRouter()
    console.log(router)
  return (
    <div> FilePage for {router.query.id}</div>
  )
}

export default FilePage