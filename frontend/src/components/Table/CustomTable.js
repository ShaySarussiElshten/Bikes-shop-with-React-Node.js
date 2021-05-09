import React from 'react'
import './CustomTable.css'

const CustomTable = props => {
    return (
        <>
          <table>
              {props.children}
          </table>  
        </>
    )
}

export default CustomTable
