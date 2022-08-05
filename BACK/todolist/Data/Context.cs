using Microsoft.EntityFrameworkCore;
using todolist.Models;

namespace todolist.Data;

public class Context: DbContext
{
    public Context(DbContextOptions options) : base(options)
    {
        
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Tarea> Tareas { get; set; }
}
