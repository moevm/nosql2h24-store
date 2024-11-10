﻿using Microsoft.AspNetCore.Mvc;
using Warehouse2.Models;
using Warehouse2.Services;

namespace Warehouse2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersService _usersService;

        public UsersController(UsersService usersService)
        {
            _usersService = usersService;
        }


        [HttpGet]
        public async Task<List<User>> GetDocsIndices() =>
            await _usersService.ListDocsAsync();

        [HttpGet("{id}")]
        public async Task<User> Get(string id) =>
            await _usersService.GetOneAsync(id);

        [HttpPost]
        public async Task<IActionResult> Post(string NSP, string role, string log, string psw, int bd)
        {
            User newObj = new User(NSP, role, log, psw, bd);

            await _usersService.UserAddAsync(newObj);

            return CreatedAtAction(nameof(Get), new { id = newObj.Key }, newObj);
        }

        //[HttpGet("login/{login}")]
        [HttpPost("auth/")]
        public async Task<List<string>> Authenticate(string log, string psw)
        {
            return await _usersService.AuthenticateAsync(log, psw);
        }
    }
}
