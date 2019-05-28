namespace FoodRestaurantApi.Migrations.FRC
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PayModeToOrder4 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Orders", "DeleteOrderItemsIDs", c => c.Decimal(precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Orders", "DeleteOrderItemsIDs", c => c.String());
        }
    }
}
