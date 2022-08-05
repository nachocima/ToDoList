using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todolist.Comandos.ComandosUsuario;
using todolist.Data;
using todolist.Models;
using todolist.Resultados.ResultadosUsuario;

namespace todolist.Controllers;

[ApiController]
public class UsuarioController:ControllerBase
{
    private readonly Context _context;
    public UsuarioController(Context context)
    {
        _context = context;
    }

    [HttpPost]
    [Route("user/post")]
    public async Task<ActionResult<UsuarioResultado>> Post([FromBody] ComandoUsuarioPost cmd){
        try{
            if(cmd.Nombre == null || cmd.Apellido == null || cmd.Email == null || cmd.NombreUsuario == null
            || cmd.Password == null){
                return BadRequest("Datos Invalidos");
            }
            else{
                var existe = await _context.Usuarios.Where(u=> u.NombreUsuario.Equals(cmd.NombreUsuario) && u.Activo).FirstOrDefaultAsync();
                var result = new UsuarioResultado();

                if(existe == null){
                    var user = new Usuario{
                        Id = Guid.NewGuid(),
                        Nombre = cmd.Nombre,
                        Apellido = cmd.Apellido,
                        Email = cmd.Email,
                        NombreUsuario = cmd.NombreUsuario,
                        Password = cmd.Password,
                        Activo = true
                    };

                    await _context.Usuarios.AddAsync(user);
                    await _context.SaveChangesAsync();

                    result.Nombre = cmd.Nombre;
                    result.Apellido = cmd.Apellido;
                    result.Email = cmd.Email;
                    result.NombreUsuario = cmd.NombreUsuario;
                    result.StatusCode = 200;

                    return Ok(result);
                } 
                else{
                    result.SetError("El nombre de usuario " + cmd.NombreUsuario + " ya existe");
                    result.StatusCode = 500;
                    return BadRequest(result.Error);
                }
            }
            
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("user/login")]
    public async Task<ActionResult<UsuarioResultado>> Login([FromBody] ComandoUsuarioLogin cmd){
        try{
            if(cmd.NombreUsuario == null || cmd.Password == null){
                return BadRequest("Datos Invalidos");
            }
            else{
                var existe = await _context.Usuarios.Where(u => u.NombreUsuario.Equals(cmd.NombreUsuario) && u.Password.Equals(u.Password)).FirstOrDefaultAsync();
                var result = new UsuarioResultado();

                if(existe != null){
                    result.Nombre = existe.Nombre;
                    result.Apellido = existe.Apellido;
                    result.Email = existe.Email;
                    result.NombreUsuario = existe.NombreUsuario;
                    result.StatusCode = 200;

                    return Ok(result);
                }
                else{
                    result.SetError("Usuario o contraseña incorrectos");
                    result.StatusCode = 500;
                    return BadRequest(result.Error);
                }

            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Route("user/put")]
    public async Task<ActionResult<UsuarioResultado>> Put([FromBody] ComandoPutUsuario cmd, string user){
        try{
            if(cmd.Nombre != null && cmd.Apellido != null && cmd.Email != null && cmd.NombreUsuario!= null){
                var existe = await _context.Usuarios.Where(u=> u.Activo && u.NombreUsuario.Equals(user)).FirstOrDefaultAsync();
                var result = new UsuarioResultado();

                if(existe != null){
                    existe.Nombre = cmd.Nombre;
                    existe.Apellido = cmd.Apellido;
                    existe.Email = cmd.Email;
                    existe.NombreUsuario = cmd.NombreUsuario;

                    _context.Usuarios.Update(existe);
                    await _context.SaveChangesAsync();

                    result.Nombre = cmd.Nombre;
                    result.Apellido = cmd.Apellido;
                    result.Email = cmd.Email;
                    result.NombreUsuario = cmd.NombreUsuario;
                    result.StatusCode = 200;

                    return Ok(result);
                }
                else{
                    result.SetError("El usuario no existe");
                    result.StatusCode = 500;
                    return BadRequest(result);
                }

            }
            else{
                return BadRequest("Datos Inválidos");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }
}
