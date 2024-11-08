using Microsoft.AspNetCore.Mvc;
using Warehouse2.Models;
using Warehouse2.Services;

namespace Warehouse2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WarehousesController
    {
        private readonly WarehousesService _warehousesService;

        public WarehousesController(WarehousesService warehousesService)
        {
            _warehousesService = warehousesService;
        }


        [HttpGet]
        public async Task<List<Warehouse>> GetDocsIndices() =>
            await _warehousesService.ListDocsAsync();
    }
}
