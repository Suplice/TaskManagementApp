using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagementApp.DTO.DTOs;
using TaskManagementApp.Core.Models;
using TaskManagementApp.Core.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using TaskManagementApp.Core.ApiResponse;

namespace TaskManagementApp.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService) {
            _taskService = taskService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<UserTaskDTO>>> CreateTask(UserTaskDTO task)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.ToDictionary(
                    k => k.Key,
                    v => v.Value?.Errors.Select(e => e.ErrorMessage).ToArray());

                var response = new ApiResponse<UserTaskDTO>(false, "ModelState is Invalid", null, errors);

                return BadRequest(response);
            }

            var addedTaskResult = await _taskService.CreateTask(task);

            if (addedTaskResult == false)
            {
                var response = new ApiResponse<UserTaskDTO>(false, "An error occured while trying to create task", null);
                return BadRequest(response);
            }
            
            var SuccessResponse = new ApiResponse<UserTaskDTO>(true, "Event was successfully added", task);

            return Ok(SuccessResponse);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<UserTaskDTO>> ModifyTask(UserTaskDTO task)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var modifyTaskResult = _taskService.ModifyTask(task);

            if (modifyTaskResult == false) { 
                return BadRequest();
            }

        }

    }
}
