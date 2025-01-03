using Core.Arango;
using Warehouse2.Models;
using Warehouse2.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<WarehouseDatabaseSettings>(
    builder.Configuration.GetSection("WarehouseDatabase"));

builder.Services.AddSingleton<InitService>();
builder.Services.AddSingleton<EventsService>();
builder.Services.AddSingleton<CellsService>();
builder.Services.AddSingleton<UsersService>();
builder.Services.AddSingleton<WarehousesService>();
builder.Services.AddSingleton<StatisticsService>();

// CORS с настройкой для фронтенда
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy =>
        {
            policy.WithOrigins("http://127.0.0.1:8000", "http://127.0.0.1") 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowLocalhost");

// app.UseCors(builder => builder.WithOrigins("http://localhost:8000", "http://127.0.0.1:80").AllowAnyHeader().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
