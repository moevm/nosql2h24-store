using Core.Arango.Protocol;
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

        
        [HttpGet("all")]
        public async Task<List<Event>> GetDocsIndices() =>
            await _eventsService.ListDocsAsync();

        [HttpGet("{key}")]
        public async Task<Event> Get(string key) =>
            await _eventsService.GetOneAsync(key);
    }
}
