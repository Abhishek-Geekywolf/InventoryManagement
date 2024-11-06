using InventoryManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<InventoryManagementContext>(x =>
{
    x.UseSqlServer(@"Server=localhost,1415;Database=InventoryManagement;User Id=sa;Password=Database!2021;TrustServerCertificate=true");

});
builder.Services.AddScoped<InventoryManagementContext>();

builder.Services.AddMediatR(x => {
    x.RegisterServicesFromAssembly(Assembly.Load("InventoryManagement.Application"));

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(options=>options.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
