namespace FoodRestaurantApi.Migrations.FRC
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PayModeToOrder3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "PaymentID", c => c.Int());
            AddColumn("dbo.Orders", "PayMode", c => c.String());
            DropColumn("dbo.Orders", "PMethod");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Orders", "PMethod", c => c.String());
            DropColumn("dbo.Orders", "PayMode");
            DropColumn("dbo.Orders", "PaymentID");
        }
    }
}
