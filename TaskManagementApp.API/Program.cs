using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.ServiceInterfaces;
using TaskManagementApp.Core.Services;
using TaskManagementApp.Data.Context;
using TaskManagementApp.Data.Repositories;
using TaskManagementApp.Core.RepositoryInterfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManagementApp.Core.JwtSettings;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IAccountService, AccountService>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = builder.Configuration.GetSection("JwtSettings:SecretKey").Get<string>();
var connectionLink = builder.Configuration.GetSection("TaskManagementFrontEnd:ConnectionLink").Get<string>();

builder.Services.Configure<JwtSettings>(jwtSettings);


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDevClient",
        builder =>
        {
            builder.WithOrigins(connectionLink)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
            
        });
});


builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 5;


    options.Lockout.AllowedForNewUsers = true;
    options.Lockout.MaxFailedAccessAttempts = 3;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);


    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>();



var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Add detailed error page in development
    app.UseSwagger();
    app.UseSwaggerUI();

}

app.UseCors("AllowReactDevClient");
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();