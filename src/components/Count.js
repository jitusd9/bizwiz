import * as React from 'react'
import {useCount} from '../components/context/count-context'

function CountDisplay(){
	const {state : {count}} = useCount();
	return <div>{`The Current Count is: ${count}`}</div>
}

function Counter(){
  const {dispatch} = useCount()
  return(
		<div>
			<button onClick={() => dispatch({type: 'increment'})}>
				Increment Count
			</button>
			<button onClick={() => dispatch({type: 'decrement'})}>
				Decrement Count
			</button>
		</div>
  )
}

export {CountDisplay, Counter}