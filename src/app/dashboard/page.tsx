import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const {} = getKindeServerSession()
  return <div>
    
  </div>
}

export default Page