namespace FoodRestaurantApi.Migrations.FRC
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PayModeToOrders : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "PMethod", c => c.String());
            DropColumn("dbo.Orders", "PaymentID");
            DropColumn("dbo.Orders", "PayMode");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Orders", "PayMode", c => c.String());
            AddColumn("dbo.Orders", "PaymentID", c => c.String());
            DropColumn("dbo.Orders", "PMethod");
        }
    }
}
