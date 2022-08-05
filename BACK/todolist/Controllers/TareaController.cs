using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todolist.Comandos.ComandosTarea;
using todolist.Data;
using todolist.Models;
using todolist.Resultados.ResultadosTarea;

namespace todolist.Controllers;

[ApiController]
public class TareaController:ControllerBase{
    private readonly Context _context;
    public TareaController(Context context)
    {
        _context = context;
        
    }

    [HttpPost]
    [Route("tarea/post")]
    public async Task<ActionResult<TareaResultado>> Post([FromBody] ComandoPostTarea cmd){
        try{
            if(cmd.Texto != null && cmd.Usuario != null){
                var user = await _context.Usuarios.Where(u=> u.Activo && u.NombreUsuario.Equals(cmd.Usuario)).FirstOrDefaultAsync();
                var result = new TareaResultado();
                if(user != null){
                    var tarea = new Tarea{
                        Id = Guid.NewGuid(),
                        Texto = cmd.Texto,
                        Terminada = false,
                        Activa = true,
                        Fecha = cmd.Fecha,
                        FechaAlta = DateTime.Now,
                        Usuario = user
                    };

                    await _context.Tareas.AddAsync(tarea);
                    await _context.SaveChangesAsync();

                    result.Texto = tarea.Texto;
                    result.Terminada = tarea.Terminada;
                    result.Activa = tarea.Activa;
                    result.Fecha = tarea.Fecha;
                    result.FechaAlta = tarea.FechaAlta;
                    result.StatusCode = 200;

                    return Ok(result);
                }
                else{
                    return BadRequest("Usuario inactivo");
                }
            }
            else{
                return BadRequest("Datos inválidos");
            }
        }
        catch(Exception e){
             return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("tarea/getAll")]
    public async Task<ActionResult<List<TareaResultado>>> GetAll(string userName){
        try{
            if(userName != null){
                var user = await _context.Usuarios.Where(u => u.NombreUsuario == userName && u.Activo).FirstOrDefaultAsync();
                if(user != null){
                    var listado = await _context.Tareas.Where(t => t.Usuario.Id == user.Id).ToListAsync();
                    if(listado != null){
                        var result = new List<TareaResultado>();
                        foreach (var t in listado)
                        {
                            var tarea = new TareaResultado{
                                Texto = t.Texto,
                                Terminada = t.Terminada,
                                Activa = t.Activa,
                                Fecha = t.Fecha,
                                FechaAlta = t.FechaAlta,
                                StatusCode = 200
                            };

                            result.Add(tarea);
                        }
                        return Ok(result);
                    }
                    else{
                        return BadRequest("No hay tareas");
                    }
                }
                else{
                    return BadRequest("Usuario inactivo");
                }
            }
            else{
                return BadRequest("Datos inválidos");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("tarea/getPendientes")]
    public async Task<ActionResult<List<TareaResultado>>> GetPendientes(string userName){
        try{
            if(userName != null){
                var user = await _context.Usuarios.Where(u => u.NombreUsuario == userName && u.Activo).FirstOrDefaultAsync();
                if(user != null){
                    var listado = await _context.Tareas.Where(t => t.Usuario.Id == user.Id && t.Activa && !t.Terminada).ToListAsync();
                    if(listado != null){
                        var result = new List<TareaResultado>();
                        foreach (var t in listado)
                        {
                            var tarea = new TareaResultado{
                                Id = t.Id,
                                Texto = t.Texto,
                                Terminada = t.Terminada,
                                Activa = t.Activa,
                                Fecha = t.Fecha,
                                FechaAlta = t.FechaAlta,
                                StatusCode = 200
                            };

                            result.Add(tarea);
                        }
                        return Ok(result);
                    }
                    else{
                        return BadRequest("No hay tareas pendientes");
                    }
                }
                else{
                    return BadRequest("Usuario inactivo");
                }
            }
            else{
                return BadRequest("Datos inválidos");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("tarea/getTerminadas")]
    public async Task<ActionResult<List<TareaResultado>>> GetTerminadas(string userName){
        try{
            if(userName != null){
                var user = await _context.Usuarios.Where(u => u.NombreUsuario == userName && u.Activo).FirstOrDefaultAsync();
                if(user != null){
                    var listado = await _context.Tareas.Where(t => t.Usuario.Id == user.Id && t.Activa && t.Terminada).ToListAsync();
                    if(listado != null){
                        var result = new List<TareaResultado>();
                        foreach (var t in listado)
                        {
                            var tarea = new TareaResultado{
                                Id = t.Id,
                                Texto = t.Texto,
                                Terminada = t.Terminada,
                                Activa = t.Activa,
                                Fecha = t.Fecha,
                                FechaAlta = t.FechaAlta,
                                StatusCode = 200
                            };

                            result.Add(tarea);
                        }
                        return Ok(result);
                    }
                    else{
                        return BadRequest("No hay tareas terminadas");
                    }
                }
                else{
                    return BadRequest("Usuario inactivo");
                }
            }
            else{
                return BadRequest("Datos inválidos");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [HttpPut]
    [Route("tarea/putTerminadas")]
    public async Task<ActionResult<TareaResultado>> PutTerminadas([FromBody] ComandoTareaPut cmd){
        try{
            if(cmd.Id != null){
                var existe = await _context.Tareas.Where(t=> t.Activa && !t.Terminada && t.Id.Equals(cmd.Id)).FirstOrDefaultAsync();
                var result = new TareaResultado();

                if(existe != null){
                    existe.Terminada = true;

                    _context.Tareas.Update(existe);
                    await _context.SaveChangesAsync();

                    result.Texto = existe.Texto;
                    result.Terminada = existe.Terminada;
                    result.Activa = existe.Activa;
                    result.Fecha = existe.Fecha;
                    result.FechaAlta = existe.FechaAlta;
                    result.StatusCode = 200;

                    return Ok(result);
                }
                else{
                    return BadRequest("La tarea no existe o ya fue finalizada");
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

    [HttpPut]
    [Route("tarea/putEliminadas")]
    public async Task<ActionResult<TareaResultado>> PutEliminadas([FromBody] ComandoTareaPut cmd){
        try{
            if(cmd.Id != null){
                var existe = await _context.Tareas.Where(t=> t.Activa && t.Id.Equals(cmd.Id)).FirstOrDefaultAsync();
                var result = new TareaResultado();

                if(existe != null){
                    existe.Activa = false;

                    _context.Tareas.Update(existe);
                    await _context.SaveChangesAsync();

                    result.Texto = existe.Texto;
                    result.Terminada = existe.Terminada;
                    result.Activa = existe.Activa;
                    result.Fecha = existe.Fecha;
                    result.FechaAlta = existe.FechaAlta;
                    result.StatusCode = 200;

                    return Ok(result);
                }
                else{
                    return BadRequest("La tarea no existe o ya fue eliminada");
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
