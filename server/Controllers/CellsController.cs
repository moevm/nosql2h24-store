﻿using Microsoft.AspNetCore.Mvc;
using Warehouse2.Models;
using Warehouse2.Services;

namespace Warehouse2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CellsController : ControllerBase
    {
        private readonly CellsService _cellsService;

        public CellsController(CellsService cellsService)
        {
            _cellsService = cellsService;
        }


        [HttpGet("all")]
        public async Task<List<Cell>> GetDocsIndices() =>
            await _cellsService.ListDocsAsync();

        [HttpGet("{key}")]
        public async Task<Cell> Get(string key) =>
            await _cellsService.GetOneAsync(key);

        [HttpPost("new")]
        public async Task<IActionResult> Post(Cell newObj)
        {
            newObj._key = Guid.NewGuid().ToString();
            newObj.isFree = true;
            newObj.needService = false;
            newObj.endOfRent = null;
            newObj.listOfEventKeys = new List<string>();

            await _cellsService.CellAddAsync(newObj);

            return CreatedAtAction(nameof(Get), new { key = newObj._key }, newObj);
        }

        [HttpPost("all")]
        public async Task<CellPage> FilterDocsIndices(CellFilterBody body)
        {
            return await _cellsService.FilterDocsAsync(body);
        }

        [HttpPost("rent")]
        public async Task<IActionResult> Rent(CellRentBody body)
        {
            var data = await _cellsService.RentCell(body);

            if (data == null)
            {
                return NotFound("No data found");
            }

            return Ok(data); // Отправляем данные в формате JSON
        }

        [HttpPost("fix")]
        public async Task<IActionResult> Fix(FixCell body)
        {
            var data = await _cellsService.FixTheCell(body);

            if (data == null)
            {
                return NotFound("No data found");
            }

            return Ok(data); // Отправляем данные в формате JSON
        }

        [HttpGet("countFreeForWarehouse")]
        public async Task<int> GetCountFreeCells(string warehouseKey)
        {
            return await _cellsService.GetCountFreeCellsAsync(warehouseKey);
        }
    }
}

