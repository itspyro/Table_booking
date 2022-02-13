import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders = [
    {
      id: 1,
      restaurant: {
        id: 1,
        name: 'The Oven',
        address: 'Aliganj, Lucknow',
        image:
          'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/lr/upwk61661577-wikimedia-image-kowapeej.jpg?w=1300&dpr=1&fit=default&crop=default&q=80&vib=3&con=3&usm=15&bg=F4F4F3&auto=format&ixlib=js-2.2.1&s=e77babb39ae491920ebbbbbd3242d288',
      },
      foodOrder: {
        id: 1,
        items: [
          {
            title: 'Fried Chicken Momo',
            price: 89,
            quantity: 2,
          },
          {
            title: 'Fried Paneer Momo',
            price: 89,
            quantity: 1,
          },
        ],
      },
      tableOrder: {
        id: 1,
        persons: 2,
        arrival: '10:00 AM',
        date: '14 Feb 2022',
      },
    },
    {
      id: 1,
      restaurant: {
        id: 1,
        name: 'PizzaHut',
        address: 'WTP, Jaipur',
        image: 'https://thumbs.dreamstime.com/z/pizza-hut-logo-22575794.jpg',
      },
      foodOrder: {
        id: 1,
        items: [
          {
            title: 'Pizza - Margherita, Large',
            price: 589,
            quantity: 1,
          },
          {
            title: 'Coca Cola',
            price: 40,
            quantity: 1,
          },
        ],
      },
      tableOrder: {
        id: 1,
        persons: 2,
        arrival: '5:00 PM',
        date: '10 Feb 2022',
      },
    },
    {
      id: 1,
      restaurant: {
        id: 1,
        name: 'McDonalds',
        address: 'Silvercity, Dehradun',
        image:
          'https://cdn.pixabay.com/photo/2016/04/20/00/41/mcdonalds-1340199_1280.jpg',
      },
      foodOrder: {
        id: 1,
        items: [
          {
            title: 'Big Mac',
            price: 199,
            quantity: 4,
          },
          {
            title: 'Fries',
            price: 89,
            quantity: 4,
          },
        ],
      },
      tableOrder: {
        id: 1,
        persons: 4,
        arrival: '6:00 PM',
        date: '12 Feb 2022',
      },
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getTotal(index: number): number {
    const order = this.orders[index];
    let total: number = 0;
    order.foodOrder.items.map((item) => {
      total += item.price * item.quantity;
    });

    return total;
  }
}
