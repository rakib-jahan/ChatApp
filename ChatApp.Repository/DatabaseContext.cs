using ChatApp.Repository.Entity;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Repository
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<User> User { get; set; }
    }
}
