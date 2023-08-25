import React from 'react'
import { checkAuth } from '../../utitl/authenticate/checkAuth'

type Props = {}

const Dashboard = (props: Props) => {


  checkAuth()
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard