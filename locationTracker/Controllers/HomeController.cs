using locationTracker.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace locationTracker.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveLocation(double latitude, double longitude)
        {
            using (var db = new ApplicationDbContext())
            {
                var location = new Location
                {
                    Latitude = latitude,
                    Longitude = longitude,
                    Timestamp = DateTime.UtcNow
                };
                db.Locations.Add(location);
                db.SaveChanges();
            }

            return Json(new { Latitude = latitude, Longitude = longitude, Message = "Location saved successfully!" });
        }
    }
}
