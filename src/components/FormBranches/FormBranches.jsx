import { Button, Heading, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './FormBranches.module.css'
import { services } from '../../API/services';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const FormBranches = () => {
  const {slug, id} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [branchData, setBranchData] = useState({
    name: "",
    address: "",
    from_time: "",
    to_time: ""
  })

  const getBranch = () => {
    services.getOne(slug, id).then(res => {
      setBranchData(res.data);
    })
  }
  
  useEffect(() => {
    if (id) {
      getBranch();
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (id) {
      services.update(slug, id, branchData).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The branch data has been succesfully edited',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false)
      })
    } else {
      services.addNew("branches", branchData).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The new branch has been succesfully added',
          showConfirmButton: false,
          timer: 1500
        })
        setBranchData({
          name: "",
          address: "",
          from_time: "",
          to_time: ""
        })
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  const handleChangeValue = (prop, value) => {
    setBranchData(old => ({...old, [`${prop}`] : value}))
  }

  return (
    <div>
      <Heading className={styles.heading}>Add new branch</Heading>
    <form onSubmit={handleSubmit} className={styles.form} >

      <label className={styles.label} >Branch name</label>
      <Input onChange={(e) => {handleChangeValue("name", e.target.value)}} value={branchData.name} name='name' placeholder='Branch name...' size='md' />

      <label className={styles.label} >Address</label>
      <Input onChange={(e) => {handleChangeValue("address", e.target.value)}} value={branchData.address} name='address' placeholder='Address...' size='md' />

      <label className={styles.label} >Opening time</label>
      <Input onChange={(e) => {handleChangeValue("from_time", e.target.value)}} value={branchData.from_time} name='from_time' placeholder='Opening time...' size='md' />

      <label className={styles.label} >Closing time</label>
      <Input onChange={(e) => {handleChangeValue("to_time", e.target.value)}} value={branchData.to_time} name='to_time' placeholder='Closing...' size='md' />

      <br /><br />
      <Button isLoading={isLoading} type='submit' colorScheme='teal' size='md'>
        Save
      </Button>

    </form>

      {/* id
      name
      address
      fromtime
      totime */}
    </div>
  );
};

export default FormBranches;
