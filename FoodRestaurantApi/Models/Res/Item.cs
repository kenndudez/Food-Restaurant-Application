using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoodRestaurantApi.Models.Res
{
    public class Item
    {

        public int ItemID { get; set; }
        public string Name { get; set; }
        public Nullable<decimal> Price { get; set; }


        public List<OrderItem> OrderItems { get; set; }
    }
}