import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Step,Icon } from 'semantic-ui-react'


const CheckoutSteps = ({ step1, step2, step3 }) => {

  return (
    <>
    <Step.Group>
       <LinkContainer to='/shipping'>
          <Step active={step1} disabled={!step1}>
            <Icon name='truck' />
            <Step.Content>
              <Step.Title>Shipping</Step.Title>
              <Step.Description>Choose your shipping options</Step.Description>
            </Step.Content>
          </Step>
        </LinkContainer>
        <LinkContainer to='/payment'>
        <Step active={step2} disabled={!step2}>
          <Icon name='payment' />
          <Step.Content>
            <Step.Title>Billing</Step.Title>
            <Step.Description>Enter billing information</Step.Description>
          </Step.Content>
        </Step>
        </LinkContainer>

        <LinkContainer to='/placeorder'>
        <Step active={step3} disabled={!step3}>
          <Icon name='info' />
          <Step.Content>
            <Step.Title>Confirm Order</Step.Title>
          </Step.Content>
        </Step>
        </LinkContainer>
      </Step.Group>
    </>
    
  )
}

export default CheckoutSteps
