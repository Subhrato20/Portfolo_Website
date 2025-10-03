namespace PortfolioApi.Models
{
    public class GroqResponse
    {
        public List<GroqChoice> Choices { get; set; } = new();
    }

    public class GroqChoice
    {
        public GroqMessage Message { get; set; } = new();
    }
}
