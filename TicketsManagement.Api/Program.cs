using TicketManagement.Api.Dal;
using TicketManagement.Api.Services;

var builder = WebApplication.CreateBuilder(args);
// NOTE:
// CORS is intentionally configured as AllowAnyOrigin for home assignment purposes.
// In a production environment, this should be restricted to specific trusted origins only.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// 1️⃣ Add services to the container
builder.Services.AddControllers().
    AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 2️⃣ Register your DI services
builder.Services.AddSingleton<ITicketDataStore, TicketDataStore>();
builder.Services.AddSingleton<ITicketService, TicketService>();

// 3️⃣ Build the app
var app = builder.Build();

// 4️⃣ Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// 5️⃣ Map controllers
app.MapControllers();
app.UseCors();

app.Run();

