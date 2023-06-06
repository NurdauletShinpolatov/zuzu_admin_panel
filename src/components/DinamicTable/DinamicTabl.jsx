import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'
import { branchesServices } from '../../API/branchesServices';
import { useParams } from 'react-router-dom';


const DinamicTable = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {slug} = useParams()

  useEffect(() => {
    setIsLoading(true);
    branchesServices.getAllBranches(slug).then(res => {
      setBranches(res.data)
    }).finally(() => {
      setIsLoading(false);
    })
  }, [])

  console.log(branches);

  return (
    <section>
      <TableContainer>
        <Table>

          <Thead>
            <Th></Th>
          </Thead>

          <Tbody>
            <Tr>
              <Td>

              </Td>
            </Tr>
          </Tbody>

        </Table>
      </TableContainer>
    </section>
  )
}

export default DinamicTable