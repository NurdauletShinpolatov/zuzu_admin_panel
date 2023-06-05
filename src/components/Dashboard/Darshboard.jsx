import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Dashboard.module.css"

const Darshboard = () => {
  return (
    <div className={styles.dashboard}>
      <Link to="/products" >
        <Button colorScheme='blue'>Products</Button>
      </Link>

      <Link to="/branches" >
        <Button colorScheme='blue'>Branches</Button>
      </Link>

      <Link to="/form/products" >
        <Button colorScheme='blue'>Add new product</Button>
      </Link>

      <Link to="/form/branches" >
        <Button colorScheme='blue'>Add new branch</Button>
      </Link>

    </div>
  )
}

export default Darshboard