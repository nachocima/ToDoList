namespace todolist.Models;

public class Usuario
{
    public Guid Id { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }
    public string Email { get; set; }
    public string NombreUsuario { get; set; }
    public string Password { get; set; }
    public bool Activo { get; set; }
}
