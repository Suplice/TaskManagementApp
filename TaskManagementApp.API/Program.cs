using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.ServiceInterfaces;
using TaskManagementApp.Core.Services;
using TaskManagementApp.Data.Context;
using TaskManagementApp.Data.Repositories;
using TaskManagementApp.Core.RepositoryInterfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();