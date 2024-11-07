using Core.Arango;
using Warehouse2.Models;
using Warehouse2.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<WarehouseDatabaseSettings>(
    builder.Configuration.GetSection("WarehouseDatabase"));

builder.Services.AddSingleton<EventsService>();
//builder.Services.AddArango(builder.Configuration.GetConnectionString("ConnctingString"));

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
