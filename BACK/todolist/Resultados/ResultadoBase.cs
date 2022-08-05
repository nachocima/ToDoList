namespace todolist.Resultados;

public class ResultadoBase
{
    public bool Ok { get; set; } = true;
    public string Error { get; set; }
    public int StatusCode { get; set; }

    public void SetError(string error){
        Ok = false;
        Error = error;
    }
}
