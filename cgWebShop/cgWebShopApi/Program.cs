using System.Text;
using cgWebShopApi.Controllers;
using cgWebShopApi.Data;
using cgWebShopApi.Models;
using cgWebShopApi.Respositories;
using cgWebShopApi.Services.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

ConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
IConfigurationRoot configurationRoot = configurationBuilder.AddUserSecrets<Program>().Build();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/////Services/////
builder.Services.AddScoped<AuthenticationSeeder>();
builder.Services.AddScoped<ITokenService, TokenService>();
//builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
//builder.Services.AddSingleton<IProductsRepository, ProductsRepository>();

/////Authentication/////
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var validIssuer = configurationRoot["AppSettings:ValidIssuer"];
        var validAudience = configurationRoot["AppSettings:ValidAudience"];
        var secretValue = configurationRoot["AppSettings:IssuerSigningKey"];
        
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ClockSkew = TimeSpan.Zero,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = validIssuer,
            ValidAudience = validAudience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(secretValue!))
        };
    });


/////IdentityCore/////
builder.Services.AddIdentityCore<AppUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
        options.User.RequireUniqueEmail = true;
        options.Password.RequireDigit = false;
        options.Password.RequiredLength = 6;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireLowercase = false;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<CgShopContext>();

/////DbContext/////
builder.Services.AddDbContext<CgShopContext>(options =>
{
    options.UseNpgsql(configurationRoot["ConnectionString"]);
});

ConfigureSwagger();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var authenticationSeeder = scope.ServiceProvider.GetRequiredService<AuthenticationSeeder>();
    authenticationSeeder.AddRoles();
    authenticationSeeder.AddAdmin();
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();

void ConfigureSwagger()
{
    builder.Services.AddSwaggerGen(option =>
    {
        option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter a valid token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "Bearer"
        });
        option.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type=ReferenceType.SecurityScheme,
                        Id="Bearer"
                    }
                },
                new string[]{}
            }
        });
    });
}