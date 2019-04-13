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
using ResWebAPI.Models;

namespace ResWebAPI.Controllers
{
    public class OrderItemController : ApiController
    {
        private ModelDB db = new ModelDB();

        // GET: api/OrderItem
        public IQueryable<OrderItem> GetOrderItems()
        {
            return db.OrderItems;
        }

        // GET: api/OrderItem/5
        [ResponseType(typeof(OrderItem))]
        public IHttpActionResult GetOrderItem(long id)
        {
            OrderItem orderItem = db.OrderItems.Find(id);
            if (orderItem == null)
            {
                return NotFound();
            }

            return Ok(orderItem);
        }

        // PUT: api/OrderItem/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrderItem(long id, OrderItem orderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderItem.OrderItemID)
            {
                return BadRequest();
            }

            db.Entry(orderItem).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderItemExists(id))
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

        // POST: api/OrderItem
        [ResponseType(typeof(OrderItem))]
        public IHttpActionResult PostOrderItem(OrderItem orderItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OrderItems.Add(orderItem);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = orderItem.OrderItemID }, orderItem);
        }

        // DELETE: api/OrderItem/5
        [ResponseType(typeof(OrderItem))]
        public IHttpActionResult DeleteOrderItem(long id)
        {
            OrderItem orderItem = db.OrderItems.Find(id);
            if (orderItem == null)
            {
                return NotFound();
            }

            db.OrderItems.Remove(orderItem);
            db.SaveChanges();

            return Ok(orderItem);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderItemExists(long id)
        {
            return db.OrderItems.Count(e => e.OrderItemID == id) > 0;
        }
    }
}