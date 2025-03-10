import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

function SignInSkeleton({ }: Props) {
    return (
        <div className=''>
            <Skeleton className=' w-full' />
            <Skeleton className=' w-full' />
        </div>
    )
}

export default SignInSkeleton