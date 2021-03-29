import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import { Container, Card } from './styles';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3001/orders');
      const orders = await res.json();
      setOrders(orders);

      const statusRes = await fetch('http://localhost:3001/status');
      const json = await statusRes.json();
      setStatuses(json);
    })();

    const socket = socketIOClient('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('newOrder', (order) => {
      setOrders(
        (prevState) => [order, ...prevState],
      );
    });

    socket.on('statusChange', (updateOrder) => {
      setOrders((prevState) => (
        prevState.map((order) => (
          order._id === updateOrder._id ? updateOrder : order
        ))
      ));
    });
  }, []);

  function handleStatusChange(order) { //? Curring -> Função que retorna outra função
    return ({ target: { value } }) => {
      fetch(`http://localhost:3001/orders/${order._id}/status`, {
        method: 'PATCH',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify({ status: value }),
      })
    };
  }

  return (
    <Container>
      {orders.map((order) => (
        <Card key={order._id} status={order.status}>
        <header>
          <h3>Pedido <strong>#{order._id.substr(0, 15)}</strong></h3>
          <small>Mesa #{order.table}</small>
        </header>

        <p>{order.description}</p>

        <select value={order.status} onChange={handleStatusChange(order)}>
          {statuses.map((status) => (
            <option key={status._id} value={status._id}>{status.name}</option>
          ))}
        </select>
      </Card>
      ))}
    </Container>
  );
}