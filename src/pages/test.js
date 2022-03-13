import React from 'react'
import { CountProvider } from '../components/context/count-context'
import { CountDisplay, Counter } from '../components/Count'


export default function Test() {
  return (
    <CountProvider>
        <Counter/>
        <CountDisplay/>
    </CountProvider>
  )
}
