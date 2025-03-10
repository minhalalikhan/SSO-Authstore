"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import SignInSkeleton from './SignInSkeleton'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import * as yup from 'yup'

import { useSearchParams } from 'next/navigation'



const Schema = yup.object().shape({
    email: yup.string().min(6, 'min email length is 6 characters').required(),
    password: yup.string().min(6, 'min pass length is 6 characters').required()
})

function SignInForm() {

    const { data, status } = useSession()


    const searchParams = useSearchParams()

    const nexturl = searchParams.get('next')
    const appID = searchParams.get('appid')


    const [Cred, setCred] = useState({
        email: '',
        password: ''
    })
    const [Err, setError] = useState<string>('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCred({ ...Cred, [e.target.name]: e.target.value })
    }
    async function signout() {
        await signOut()
    }

    async function SubmitSignIn() {
        try {

            // validate will trhow error if validation fails
            await Schema.validate(Cred, { abortEarly: true })

            const res = await signIn('credentials',
                { email: Cred.email, password: Cred.password, redirect: false })


            if (!res) {
                setError('Unexpected Error')
            }
            else {
                if (res.error)
                    setError(res.error)
                else setError('')
            }

        } catch (err: unknown) {
            if (err instanceof Error && err?.name === 'ValidationError') {
                setError(err.message); // Set validation error message
            }

            else
                setError('Unexpected Error Happended')
        }
    }

    async function SSOlogin() {
        console.log('calling sso login')

        if (!appID || !nexturl)
            return
        try {
            const res = await fetch(`/api/token?appid=${appID}&next=${nexturl}`, {
                method: "GET",
                credentials: "include", // Ensures cookies (session) are sent
            });

            if (!res.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await res.json();

            window.open(data.data,
                '_self'
            )
        } catch (err) {
            console.log('err occured', err)
        }
    }


    useEffect(() => {
        if (status === 'authenticated' && nexturl) {
            SSOlogin()
        }
    }, [status, nexturl])
    if (status === 'loading')
        return <SignInSkeleton />

    if (status === 'authenticated') {


        return (

            <div className='w-[500px] flex flex-col gap-4 items-center'>
                <h3 className=' text-gray-600'> Signed In As</h3>
                <p className='font-extrabold'>  { data.user?.email }</p>
                <Button onClick={ signout } className='cursor-pointer mt-5'>
                    Sign Out
                </Button>
            </div>

        )
    }

    return (
        <div className='max-w-[90vw] w-[500px] h-fit max-h-[80vh] 
        rounded border-2 border-gray-300 p-5 flex flex-col gap-10'>
            <h3 className='font-semibold text-center'>Sign In</h3>
            <div className=' flex flex-col gap-5'>

                <Input type='email' placeholder='Email' value={ Cred.email } name='email'
                    onChange={ handleChange }
                />
                <Input type='password' placeholder='Password' value={ Cred.password }
                    name='password' onChange={ handleChange }
                />
            </div>
            { Boolean(Err) && <p className='bg-red-200 text-red-600 px-2 py-1 rounded-sm'>{ Err }</p> }
            <Button className='cursor-pointer' onClick={ SubmitSignIn } >
                Sign In
            </Button>

        </div>
    )
}

export default SignInForm