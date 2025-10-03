namespace PortfolioApi.Models
{
    public class GroqRequest
    {
        public List<GroqMessage> Messages { get; set; } = new();
        public string Model { get; set; } = "llama-3.3-70b-versatile";
    }
}
