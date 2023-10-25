import React from "react";
import Items from "./Items";
import {Alert, SimpleGrid, AlertTitle, AlertDescription, useDisclosure, Button} from "@chakra-ui/react";

const Orders = ({ ordersItems }) => {
  if (!ordersItems?.data) return null;
  const ordersData = [], ordersKeys = [];
  ordersItems?.data.forEach((item: any) => {
    if (!ordersData[item._orderId]) {
      ordersData[item._orderId] = [];
      ordersKeys.push(item._orderId);
    }
    ordersData[item._orderId].push(item);
  });
  if (ordersData == null) return null;
  return (
    <SimpleGrid columns={2} spacing={4}>
      {ordersKeys.map(index=> {
        const orderDetail = ordersData[index]
        return <OrderDetails key={index} index={index} orderDetail={orderDetail}/>
      })}
    </SimpleGrid>
  );
};

const OrderDetails = ({index, orderDetail}) => {
  const {
    isOpen: isVisible,
    onClose,
  } = useDisclosure({ defaultIsOpen: true })
  return isVisible ? (
    <Alert variant='top-accent' status='success'
      flexDirection='column'
      alignItems='stretch'
      justifyContent='space-between'>
      <AlertTitle textAlign="center">{index.toString()}</AlertTitle>
      <AlertDescription>
        <Items OrderItems={orderDetail} />
      </AlertDescription>
      <Button justifySelf={"flex-end"} onClick={onClose}>Objednávka vydána</Button>
    </Alert>
  ):null;
}

export default Orders;
