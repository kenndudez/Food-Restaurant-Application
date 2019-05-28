using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FoodRestaurantApi.Models.Res
{
    public class PaymentMode
    {
        [Key]
        public long PaymentID { get; set; }
        public string PayMode { get; set; }

        public List<Order> Orders { get; set; }
    }
}