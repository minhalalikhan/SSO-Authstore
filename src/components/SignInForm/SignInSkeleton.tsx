import React from 'react'
import { Skeleton } from '../ui/skeleton'



function SignInSkeleton() {
    return (
        <div className='w-[600px] max-w-full'>
            <Skeleton className=' w-full h-[50px]' />
            <Skeleton className=' w-full h-[50px]' />
        </div>
    )
}

export default SignInSkeleton