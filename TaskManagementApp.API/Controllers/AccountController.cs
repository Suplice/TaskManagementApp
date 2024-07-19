using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.OpenApi.Any;
using System.IdentityModel.Tokens.Jwt;
using TaskManagementApp.Core.ApiResponse;
using TaskManagementApp.Core.JwtSettings;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.ServiceInterfaces;
using TaskManagementApp.DTO.DTOs;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace TaskManagementApp.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IConfiguration _config;

        public AccountController(IAccountService accountService, IConfiguration config) {
            _config = config;
            _accountService = accountService;
        }

        private Dictionary<string, List<string>?> GetModelStateErrors (ModelStateDictionary modelState)
        {
            var errors = modelState.ToDictionary(
                k => k.Key,
                v => v.Value?.Errors.Select(e => e.ErrorMessage).ToList());

            return errors;
        }

        private string GetJwtToken(User user)
        {

            var claims = new[]
              {
            new Claim(ClaimTypes.NameIdentifier, user.Id) // Add NameIdentifier claim
             };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var Sectoken = new JwtSecurityToken(_config["JwtSettings:Issuer"],
                _config["JwtSettings:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

            return token;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO registerData)
        {
            if (!ModelState.IsValid) {
                var errors = GetModelStateErrors(ModelState);

                var response = new ApiResponse<RegisterDTO>(false, "Model state is invalid", registerData, errors);

                return BadRequest(response);
            }

            var registerResult = await _accountService.RegisterUserAsync(registerData);

            if (!registerResult.Succeeded) {
                foreach (var error in registerResult.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }

                var errors = GetModelStateErrors(ModelState);

                var response = new ApiResponse<RegisterDTO>(false, "failed to registre", registerData, errors);
                
                return BadRequest(response);
            }

            var successResponse = new ApiResponse<RegisterDTO>(true, "registered successfully", registerData);
            return Ok(successResponse);
        }



        [HttpPost("login")]
        public async Task<IActionResult> SignIn(SignInDTO signInData)
        {
            if (!ModelState.IsValid)
            {
                var errors = GetModelStateErrors(ModelState);

                var response = new ApiResponse<SignInDTO>(false, "ModelState is invalid", signInData, errors);

                return BadRequest(response);
            }

            var signInResult = await _accountService.SignInAsync(signInData);


            if (signInResult.Succeeded)
            {
                var user = await _accountService.FindUserAsync(signInData.Login);

                var tokenString = GetJwtToken(user);


                var userDTO = new UserDTO
                {
                    Login = user.UserName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber
                };

                var successResponse = new ApiResponse<UserDTO>(true, "zalogowano pomyślnie", userDTO);

                successResponse.JwtToken = tokenString;

                return Ok(successResponse);
            }
            else {
                var errors = GetModelStateErrors(ModelState);

                var response = new ApiResponse<SignInDTO>(false, "failed to sign in", signInData, errors);

                return BadRequest(response);
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("logout")]
        public IActionResult SignOutAsync()
        {
           _accountService.SignOutAsync();

            return Ok();
        }

    }
}
