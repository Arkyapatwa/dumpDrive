
// import { useRouter } from 'next/router'

const FilePage = ({params}: {params: {id:string}}) => {
    // const router  = useRouter()
    console.log(params)
  return (
    <div> FilePage for {params.id}</div>
  )
}

export default FilePage