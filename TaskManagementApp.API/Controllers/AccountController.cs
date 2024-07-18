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

namespace TaskManagementApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        IAccountService _accountService;
        IOptions<JwtSettings> _jwtSettings;

        public AccountController(IAccountService accountService, IOptions<JwtSettings> jwtSettings) {
            _jwtSettings = jwtSettings;
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
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtSettings = _jwtSettings.Value;
            var key = Encoding.ASCII.GetBytes(jwtSettings.SecretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                }),
                Expires = DateTime.UtcNow.AddHours(jwtSettings.ExpiryHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };


            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
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

        [Authorize]
        [HttpPost("logout")]
        public IActionResult SignOut()
        {
           _accountService.SignOutAsync();

            return Ok();
        }

    }
}
