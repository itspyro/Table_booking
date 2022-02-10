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
        persons: 4,
        arrival: '5:00 PM',
        date: '10 Feb 2022',
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
