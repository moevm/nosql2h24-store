namespace Warehouse2.Models
{
    public class WarehouseDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string CellsCollectionName { get; set; } = null!;

        public string EventCollectionName { get; set; } = null!;

        public string UsersCollectionName { get; set; } = null!;

        public string WarehousesCollectionName { get; set; } = null!;
    }
}
