using Microsoft.EntityFrameworkCore;

namespace WebAppJquery.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> op) : base(op)
    {

    }
    public DbSet<ToDoItem> ToDoItems { get; set; }
    }

}
