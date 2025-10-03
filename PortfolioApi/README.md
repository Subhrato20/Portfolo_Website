# Portfolio API - .NET Web API

This is the backend API for the portfolio website, built with C# .NET 8.0.

## Features

- Groq AI Chat integration
- CORS enabled for frontend communication
- RESTful API endpoints
- Swagger/OpenAPI documentation

## Setup

### Prerequisites

- .NET 8.0 SDK
- Visual Studio Code or Visual Studio (optional)

### Configuration

1. Set the `GROQ_API_KEY` environment variable or add it to `appsettings.json`:
   ```json
   {
     "GROQ_API_KEY": "your-groq-api-key-here"
   }
   ```

### Running the API

1. Navigate to the PortfolioApi directory:
   ```bash
   cd PortfolioApi
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the application:
   ```bash
   dotnet run
   ```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:7000`

### API Endpoints

- `POST /api/groq` - Chat with the AI assistant

### Swagger Documentation

When running in development mode, Swagger UI is available at:
- `https://localhost:7000/swagger`

## Deployment

This API can be deployed to various platforms:

### Azure App Service
1. Create an Azure App Service
2. Deploy the PortfolioApi folder
3. Set the `GROQ_API_KEY` in Application Settings

### AWS Elastic Beanstalk
1. Create an Elastic Beanstalk application
2. Deploy the PortfolioApi folder
3. Set environment variables

### Docker
Create a Dockerfile in the PortfolioApi directory:
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["PortfolioApi.csproj", "."]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PortfolioApi.dll"]
```

## Frontend Integration

The frontend (React app) should be configured to call the deployed API endpoint instead of the local development URL. Update the fetch URL in `src/pages/GroqChat.js` to point to your deployed API.
