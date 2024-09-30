import React from 'react'
import "./orders.scss"
import { Link } from 'react-scroll'
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
export default function Orders() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest
        .get(
          `/orders`
        )
        .then((res) => {
          return res.data;
        }),
  });
  const navigate=useNavigate()
  const currentUser=JSON.parse(localStorage.getItem("currentUser"))
  
  
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
    {isLoading?"loading":error?"something was wrong!":<div className="container">
      <div className="title">
        <h1>Orders</h1>
      </div>
      <table>
      <tbody>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Contact</th>
        </tr>
       {data.map((order)=>(
        <tr key={order._id}>
          
          <td>
            <img
              className="image"
              src={order.img}
              alt=""
            />
          </td>
          <td>{order.title}</td>
          <td>{order.price}</td>
          <td>
            <img className="delete" src="./img/message.png" alt=""               onClick={()=>handleContact(order)}
 />
          </td>
        </tr>
        ))}
        </tbody>
        </table>
        </div>}
        </div>
  )
}
