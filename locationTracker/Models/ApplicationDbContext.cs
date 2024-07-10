using locationTracker.Models;

public class ApplicationDbContext : DbContext
{
    public DbSet<Location> Locations { get; set; }
}