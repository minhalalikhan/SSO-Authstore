'use client'
import React, { useEffect, useRef } from 'react'

type Props = { url: string }

function ExternalUrl({ url }: Props) {

    const ref = useRef<HTMLAnchorElement | null>(null)
    useEffect(() => {
        console.log('inside url comp', ref)
        console.log('the url', url)
        if (ref.current && url) {
            console.log('calling click')
            ref.current.click()
        }
    }, [url])


    useEffect(() => {
        console.log("link comp craeted")
    }, [])
    return (
        <a className='hidden'
            ref={ ref }
            target='_blank' referrerPolicy='no-referrer' href={ url }>
            { 'click here' }
        </a>
    )
}

export default ExternalUrl