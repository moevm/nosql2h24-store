﻿using Core.Arango.Protocol;
using Microsoft.AspNetCore.Mvc;
using Warehouse2.Models;
using Warehouse2.Services;

namespace Warehouse2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly EventsService _eventsService;

        public EventsController(EventsService eventsService)
        {
            _eventsService = eventsService;
        }

        
        [HttpGet]
        public async Task<List<Event>> GetDocsIndices() =>
            await _eventsService.ListDocsAsync();

        [HttpGet("{id}")]
        public async Task<Event> Get(string id) =>
            await _eventsService.GetOneAsync(id);
    }
}
