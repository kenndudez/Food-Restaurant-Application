using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using FoodRestaurantApi.Data;
using FoodRestaurantApi.Models.Res;

namespace FoodRestaurantApi.Controllers
{
    public class OrderController : ApiController
    {
        private FoodResContext db = new FoodResContext();

        // GET: api/Order
               public System.Object GetOrders() 
        {
            var result = (from a in db.Orders
                          join b in db.Customers on a.CustomerID equals b.CustomerID
                          from c in db.Orders
                          join d in db.PaymentMode on c.OrderID equals d.PaymentID
                          select new
                          {
                              a.OrderID,
                              a.OrderNo,
                              Customer = b.Name,
                              PayMode = d.PayMode,
                              a.GTotal
                          }).ToList();
            return result;
        }

        // GET: api/Order/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder(long id)
        {
            var order = (from a in db.Orders
                         join c in db.PaymentMode on a.PayMode equals c.PayMode
                         where a.OrderID == id
                         select new
                         {
                             a.PaymentID,
                             a.OrderID,
                             a.OrderNo,
                             a.CustomerID,
                             PayMode = c.PayMode,
                             a.GTotal,
                             DeleteOrderItemsIDs = ""
                         }).FirstOrDefault();
            var orderDetails = (from a in db.OrderItems
                                join b in db.Item on a.ItemID equals b.ItemID
                                where a.OrderID == id

                                select new
                                {
                                    a.OrderID,
                                    a.OrderItemID,
                                    a.ItemID,
                                    ItemName = b.Name,
                                    b.Price,
                                    a.Quantity,
                                    Total = a.Quantity * b.Price

                                }).ToList();
            return Ok(new { order, orderDetails });
        }

        // PUT: api/Order/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(long id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.OrderID)
            {
                return BadRequest();
            }

            db.Entry(order).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Order
        [ResponseType(typeof(Order))]
        public IHttpActionResult PostOrder(Order order)
        {
            try
            {
                //Order Table
                if (order.OrderID == 0)
                    db.Orders.Add(order);  //do insert operation
                else
                    db.Entry(order).State = EntityState.Modified;

                //OrderItems table 
                foreach (var item in order.OrderItems)
                {
                    if (item.OrderItemID == 0)
                        db.OrderItems.Add(item);
                    else
                        db.Entry(item).State = EntityState.Modified;

                }

                //Delete for OrderItems
             //   foreach (var id in order.DeleteOrderItemsIDs.Split(',').Where(x => x != ""))
             //   {
             //       OrderItem x = db.OrderItems.Find(Convert.ToInt64(id));
             //       db.OrderItems.Remove(x);
             //   }

                db.SaveChanges();

                return Ok();
            }

            catch (Exception ex)
            {
                throw ex;
            }


        }

        // DELETE: api/Order/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(long id)
        {
            Order order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            db.Orders.Remove(order);
            db.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(long id)
        {
            return db.Orders.Count(e => e.OrderID == id) > 0;
        }
    }
}