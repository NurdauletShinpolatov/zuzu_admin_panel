import { Button, Heading, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from "./FormProucts.module.css"
import { services } from '../../API/services';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const FormProducts = () => {
  const {slug, id} = useParams();
  const { register, setValue, handleSubmit, reset } = useForm({
    defaultValues: {}
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const getProduct = () => {
    services.getOne(slug, id).then(res => {
      const { title, image, price, category, description } = res.data;
      setValue('title', title);
      setValue('image', image);
      setValue('price', price);
      setValue('category', category);
      setValue('description', description);
    })
  }

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [])
  
  const onSubmit = (data) => {
    setIsLoading(true)
    console.log(data);
    if (id) {
      services.update(slug, id, data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The product data has been succesfully edited',
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false);
        navigate('/products');
      })
    } else {
      services.addNew("products", data).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The new product has been succesfully added',
          showConfirmButton: false,
          timer: 1500
        });
        reset();
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  return (
    <div>
      <Heading className={styles.heading}>Add new product</Heading>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >

        <label htmlFor="title" className={styles.label} >Product title</label>
        <Input {...register("title")} name='title' placeholder='Product title...' size='md' />
        
        <label htmlFor="description" className={styles.label} >Description</label>
        <Input {...register('description')} placeholder='description...' size='md' />

        <label htmlFor="image" className={styles.label} >Image URL</label>
        <Input {...register('image')} placeholder='URL of the image...' size='md' />

        <label htmlFor="price" className={styles.label} >Price</label>
        <Input {...register('price')} placeholder='Price...' size='md' />

        <label htmlFor="category" className={styles.label} >Category</label>
        <Input {...register('category')} placeholder='Cattegory...' size='md' />

        <br /><br />
        <Button isLoading={isLoading} type='submit' colorScheme='teal' size='md'>
          Save
        </Button>

      </form>
    </div>
  );
};

export default FormProducts;
