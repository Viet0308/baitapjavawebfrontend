import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { OrderDetails } from '../order-detail/order-detail.model'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderDetails:  OrderDetails[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderDetailService: OrderDetailService
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      const id = Number(orderId);
      this.orderDetailService.getOrderDetail(id).subscribe(details => {
        this.orderDetails = details;
      });
  }
}
}
