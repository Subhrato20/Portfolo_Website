using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;
using System.Text;
using System.Text.Json;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroqController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public GroqController(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Message))
                {
                    return BadRequest(new { error = "No message provided" });
                }

                if (string.IsNullOrEmpty(request.ResumeText))
                {
                    return BadRequest(new { error = "No resume text provided" });
                }

                var systemMessage = $@"You are an AI chatbot representing Subhrato Som. The following is your resume. Answer questions about your skills and experience based *only* on the information in the resume. If the answer is not in the resume, say so. Speak in the first person, as if you are Subhrato Som.

RESUME:
{request.ResumeText}

Here are some example question and answer pairs:
Q: What are your skills in AWS?
A: I have experience with AWS EC2, AWS SageMaker, AWS Lambda, and AWS Cognito.
Q: Tell me about a project where you used machine learning.
A: I developed an Image Captioning system for Chest X-ray Images as my capstone project at the Vellore Institute of Technology. I used TensorFlow-Keras and CNN architectures like Xception, VGG16, and ResNet for image classification and LSTM networks for caption generation. The system achieved 86.4% accuracy in disease identification.
Q: Where did you go to school?
A: I received my Master's degree in Computer Science from Drexel University and my Bachelor's degree in Computer Science and Engineering from the Vellore Institute of Technology.";

                var messages = new List<GroqMessage>
                {
                    new() { Role = "system", Content = systemMessage },
                    new() { Role = "user", Content = request.Message }
                };

                var groqRequest = new GroqRequest
                {
                    Messages = messages,
                    Model = "llama-3.3-70b-versatile"
                };

                var jsonContent = JsonSerializer.Serialize(groqRequest);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var apiKey = _configuration["GROQ_API_KEY"];
                if (string.IsNullOrEmpty(apiKey))
                {
                    return StatusCode(500, new { error = "Groq API key not configured" });
                }

                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

                var response = await _httpClient.PostAsync("https://api.groq.com/openai/v1/chat/completions", content);

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode(500, new { error = $"Groq API error: {response.StatusCode}" });
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                var groqResponse = JsonSerializer.Deserialize<GroqResponse>(responseContent);

                if (groqResponse?.Choices?.Count > 0)
                {
                    var rawResponse = groqResponse.Choices[0].Message.Content;
                    var cleanedResponse = CleanGeneratedText(rawResponse);
                    
                    return Ok(new ChatResponse { Response = cleanedResponse });
                }

                return StatusCode(500, new { error = "No response from Groq API" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        private static string CleanGeneratedText(string text)
        {
            if (string.IsNullOrEmpty(text))
                return string.Empty;

            var unwantedPatterns = new[] { "<|start_header_id|>", "<|end_header_id|>", "</s>", "**" };
            
            foreach (var pattern in unwantedPatterns)
            {
                text = text.Replace(pattern, "");
            }

            if (text.StartsWith("assistant", StringComparison.OrdinalIgnoreCase))
            {
                text = text.Substring("assistant".Length).Trim();
            }

            return text.Trim();
        }
    }
}
