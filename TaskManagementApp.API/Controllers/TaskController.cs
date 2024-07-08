using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApp.DTO.DTOs;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.ServiceInterfaces;

namespace TaskManagementApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService) {
            _taskService = taskService;
        }


        [HttpPost]
        public async Task<ActionResult<UserTaskDTO>> CreateTask(UserTaskDTO task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var UserId = HttpContext.User.Identity.Name;

            if (UserId == null)
            {

            }
            return Ok(task);
        }
    }
}
