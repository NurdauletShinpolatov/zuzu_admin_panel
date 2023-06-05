import { Button, Heading, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import styles from "./FormProucts.module.css"
import { services } from '../../API/services';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const FormProducts = () => {


  const {slug, id} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    image: "",
    price: "",
    category: "",
    description: ""
  });

  const getProduct = () => {
    services.getOne(slug, id).then(res => {
      setProductData(res.data);
    })
  }

  useEffect(() => {
    if (id) {
      getProduct();
    }
  }, [])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (id) {
      services.update(slug, id, productData).then(() => {
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
        setIsLoading(false)
      })
    } else {
      services.addNew("products", productData).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'The new product has been succesfully added',
          showConfirmButton: false,
          timer: 1500
        })
        setProductData({
          title: "",
          image: "",
          price: "",
          category: "",
          description: ""
        })
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false)
      })
    }
  }

  const handleChangeValue = (prop, value) => {
    setProductData(old => ({...old, [`${prop}`] : value}))
  }

  return (
    <div>
      <Heading className={styles.heading}>Add new product</Heading>
    <form onSubmit={handleSubmit} className={styles.form} >

      <label htmlFor="title" className={styles.label} >Product title</label>
      <Input onChange={(e) => {handleChangeValue("title", e.target.value)}} value={productData.title} name='title' placeholder='Product title...' size='md' />

      <label htmlFor="description" className={styles.label} >Description</label>
      <Input onChange={(e) => {handleChangeValue("description", e.target.value)}} value={productData.description} name='description' placeholder='description...' size='md' />

      <label htmlFor="image" className={styles.label} >Image URL</label>
      <Input onChange={(e) => {handleChangeValue("image", e.target.value)}} value={productData.image} name='image' placeholder='URL of the image...' size='md' />

      <label htmlFor="price" className={styles.label} >Price</label>
      <Input onChange={(e) => {handleChangeValue("price", e.target.value)}} value={productData.price} name='price' placeholder='Price...' size='md' />

      <label htmlFor="category" className={styles.label} >Category</label>
      <Input onChange={(e) => {handleChangeValue("category", e.target.value)}} value={productData.category} name='category' placeholder='Cattegory...' size='md' />

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

export default FormProducts;
