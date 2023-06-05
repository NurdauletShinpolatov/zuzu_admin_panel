import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button
} from '@chakra-ui/react'
import { services } from '../../API/services';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const DinamicTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {slug} = useParams();

  const fields = data?.length > 0 ? Object.keys(data[0]) : [];

  const getData = () => {
    setIsLoading(true);
    services.getAll(slug).then(res => {
      setData(res.data);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const handleDelete = (id) => {
    Swal.showLoading()
    services.delete(slug, id).then(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Succesfully deleted!',
        showConfirmButton: false,
        timer: 1500
      })
      getData();
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      Swal.hideLoading()
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <section className=''>
      {
        isLoading ? (
          <center className='center'>
            <div class="preloader-wrapper big active">
              <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </center>
        ) : (
          <TableContainer>
            <Table>
    
              <Thead>           
                {
                    fields?.map((field, index) => (
                        <Th key={index}>{field}</Th>
                    ))
                }
              </Thead>
    
              <Tbody>
                {
                  data?.map(obj =>(                
                    <Tr>
                      {
                        fields.map((field, index) => (
                          <Td>
                            {obj[field].slice(0, 50)}
                          </Td>
                        ))
                      }
                      <Td>
                        <Link to={"/edit/"+slug + "/" + obj.id}>
                          <Button colorScheme='teal' size='sm'>
                            Edit
                          </Button>
                        </Link>
                        
                        <Button onClick={()=>{handleDelete(obj.id)}} colorScheme='teal' size='sm'>
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))
                }
              </Tbody>
    
            </Table>
          </TableContainer>
        )
      }
    </section>
  )
}

export default DinamicTable