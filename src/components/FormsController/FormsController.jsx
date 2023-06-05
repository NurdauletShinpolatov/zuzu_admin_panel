import React from 'react'
import { useParams } from 'react-router-dom'
import FormProducts from '../FormProducts/FormProducts';
import FormBranches from '../FormBranches/FormBranches';

const FormsController = () => {
    const {slug} = useParams();

  return (
    <>
        <div>
            {
                slug == "branches"? (
                        <FormBranches />
                    ) : (
                        <FormProducts />
                )
            }
        </div>
 
    </>
  )
}

export default FormsController