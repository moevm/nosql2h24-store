using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Warehouse2.Models;
using Warehouse2.Services;

namespace Warehouse2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WarehousesController : ControllerBase
    {
        private readonly WarehousesService _warehousesService;

        public WarehousesController(WarehousesService warehousesService)
        {
            _warehousesService = warehousesService;
        }


        [HttpGet]
        public async Task<List<Warehouse>> Get() =>
            await _warehousesService.ListDocsAsync();

        [HttpGet("{id}")]
        public async Task<Warehouse> Get(string id) =>
            await _warehousesService.GetOneAsync(id);

        [HttpPost]
        public async Task<IActionResult> Post(string nAddress, int nCapacity, string nChiefId = "")
        {
            Warehouse newObj = new Warehouse(nAddress, nCapacity, nChiefId);

            await _warehousesService.WarehouseAddAsync(newObj);

            return CreatedAtAction(nameof(Get), new { id = newObj.Key }, newObj);
        }
    }
}
