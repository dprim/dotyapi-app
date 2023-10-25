import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const Items = ({OrderItems}) => {
  return (
    <TableContainer>
      <Table size="sm" variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Položka</Th>
            <Th isNumeric>Počet</Th>
          </Tr>
        </Thead>
        <Tbody>
          {OrderItems.map((item: any) => <Item key={item.id} item={item}/>)} 
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const Item = ({ item }) => {
  return (
    <Tr>
      <Td fontSize="xl">{item.name}</Td>
      <Td isNumeric>{item.quantity}</Td>
    </Tr>
  );
};

export default Items
