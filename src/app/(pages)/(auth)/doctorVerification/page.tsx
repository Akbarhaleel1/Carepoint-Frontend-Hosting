
import { Suspense } from 'react'
import DoctorVerification from './components/DoctorVerification'

const page = () => {
  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
        <DoctorVerification/>
        </Suspense>
    </div>
  )
}

export default page
