using System.Text;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using API.Helpers;
using API.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddSignalR(options =>
 {
     options.EnableDetailedErrors = true;
 });
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"])),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
builder.Services.AddScoped<IAuctionRepository, AuctionRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
builder.Services.AddDbContext<AuctionContext>(options =>
options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:4200"));

app.UseAuthentication();

app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<AuctionHub>("/auction");
});



app.Run();
