using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoodRestaurantApi.Models.Res
{
    public class Order
    {

        public long OrderID { get; set; }
        public string OrderNo { get; set; }
        public Nullable<int> PaymentID { get; set; }
        public Nullable<int> CustomerID { get; set; }
        public string PayMode { get; set; }
        public Nullable<decimal> GTotal { get; set; }

        public Nullable<decimal> DeleteOrderItemsIDs { get; set; }
        public Customer Customer { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}