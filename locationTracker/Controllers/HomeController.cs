using locationTracker.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace locationTracker.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SaveLocation(double latitude, double longitude)
        {
            var location = new Location
            {
                Latitude = latitude,
                Longitude = longitude,
                Timestamp = DateTime.UtcNow
            };

            _context.Locations.Add(location);
            _context.SaveChanges();

            return Json(new { Latitude = latitude, Longitude = longitude, Message = "Location saved successfully!" });
        }
    }
}
