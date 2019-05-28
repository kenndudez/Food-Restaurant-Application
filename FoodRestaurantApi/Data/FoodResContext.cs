using FoodRestaurantApi.Models.Res;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FoodRestaurantApi.Data
{
    public class FoodResContext : DbContext
    {
        public FoodResContext() : base("DefaultConnection"){}
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Item> Item { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<PaymentMode> PaymentMode { get; set; }
    }
}