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
    public class PaymentModeController : ApiController
    {
        private FoodResContext db = new FoodResContext();

        // GET: api/PaymentMode
        public IQueryable<PaymentMode> GetPaymentMode()
        {
            return db.PaymentMode;
        }

        // GET: api/PaymentMode/5
        [ResponseType(typeof(PaymentMode))]
        public IHttpActionResult GetPaymentMode(long id)
        {
            PaymentMode paymentMode = db.PaymentMode.Find(id);
            if (paymentMode == null)
            {
                return NotFound();
            }

            return Ok(paymentMode);
        }

        // PUT: api/PaymentMode/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPaymentMode(long id, PaymentMode paymentMode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paymentMode.PaymentID)
            {
                return BadRequest();
            }

            db.Entry(paymentMode).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentModeExists(id))
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

        // POST: api/PaymentMode
        [ResponseType(typeof(PaymentMode))]
        public IHttpActionResult PostPaymentMode(PaymentMode paymentMode)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PaymentMode.Add(paymentMode);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = paymentMode.PaymentID }, paymentMode);
        }

        // DELETE: api/PaymentMode/5
        [ResponseType(typeof(PaymentMode))]
        public IHttpActionResult DeletePaymentMode(long id)
        {
            PaymentMode paymentMode = db.PaymentMode.Find(id);
            if (paymentMode == null)
            {
                return NotFound();
            }

            db.PaymentMode.Remove(paymentMode);
            db.SaveChanges();

            return Ok(paymentMode);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PaymentModeExists(long id)
        {
            return db.PaymentMode.Count(e => e.PaymentID == id) > 0;
        }
    }
}