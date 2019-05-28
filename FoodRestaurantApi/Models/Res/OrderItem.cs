using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoodRestaurantApi.Models.Res
{
    public class OrderItem
    {

        public long OrderItemID { get; set; }
        public Nullable<long> OrderID { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<int> Quantity { get; set; }

        public Item Name { get; set; }
        public Order Order { get; set; }
    }
}