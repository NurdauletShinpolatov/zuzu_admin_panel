import { Button, Heading, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from './FormBranches.module.css'
import { services } from '../../API/services';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const FormBranches = () => {
  const {slug, id} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { register, setValue, handleSubmit, reset } = useForm({
    defaultValues: {}
  });
  const navigate = useNavigate();

  const getBranch = () => {
    services.getOne(slug, id).then(res => {
      const { name, address, from_time, to_time } = res.data;
      setValue("name", name)
      setValue("address", address)
      setValue("from_time", from_time)
      setValue("to_time", to_time)
    })
  }
  
  useEffect(() => {
    if (id) {
      getBranch();
    }
  }, [])

  const onSubmit = (data) => {
    setIsLoading(true)
    if (id) {
      services.update(slug, id, data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The branch data has been succesfully edited',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(err => {
        console.log(err.status);
      }).finally(() => {
        setIsLoading(false)
        navigate('/branches');
      })
    } else {
      services.addNew("branches", data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The new branch has been succesfully added',
          showConfirmButton: false,
          timer: 1500
        })
        reset();
      }).catch(err => {
        console.log(err.status);
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  return (
    <div>
      <Heading className={styles.heading}>Add new branch</Heading>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >

        <label className={styles.label} >Branch name</label>
        <Input {...register("name")} placeholder='Branch name...' size='md' />

        <label className={styles.label} >Address</label>
        <Input {...register("address")} placeholder='Address...' size='md' />

        <label className={styles.label} >Opening time</label>
        <Input {...register("from_time")} placeholder='Opening time...' size='md' />

        <label className={styles.label} >Closing time</label>
        <Input {...register("to_time")} placeholder='Closing...' size='md' />

        <br /><br />
        <Button isLoading={isLoading} type='submit' colorScheme='teal' size='md'>
          Save
        </Button>

      </form>
    </div>
  );
};

export default FormBranches;
