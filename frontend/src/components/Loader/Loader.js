import React from 'react'
import ReactLoading from 'react-loading';


const Loader = ({ type='bars', color='black' }) => (
	<ReactLoading type={type} color={color} style={{
    width: '100px',
    height: '100px',
    margin: 'auto',
    display: 'block',
  }} />
);

export default Loader;

