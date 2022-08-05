namespace todolist.Models;

public class Tarea
{
    public Guid Id { get; set; }
    public string Texto { get; set; }
    public bool Terminada { get; set; }
    public bool Activa { get; set; }
    public string? Fecha { get; set; }
    public DateTime FechaAlta { get; set; }
    public Usuario Usuario { get; set; }
}
