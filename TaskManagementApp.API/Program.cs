using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.ServiceInterfaces;
using TaskManagementApp.Core.Services;
using TaskManagementApp.Data.Context;
using TaskManagementApp.Data.Repositories;
using TaskManagementApp.Core.RepositoryInterfaces;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddIdentity<User, IdentityUser>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 5;
    

    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.MaxFailedAccessAttempts = 3;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);


    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Add detailed error page in development
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseAuthentication();
app.UseHttpsRedirection();
app.MapControllers(); 
app.Run();