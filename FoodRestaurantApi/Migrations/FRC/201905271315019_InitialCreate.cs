namespace FoodRestaurantApi.Migrations.FRC
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        CustomerID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.CustomerID);
            
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        OrderID = c.Long(nullable: false, identity: true),
                        OrderNo = c.String(),
                        CustomerID = c.Int(),
                        PMethod = c.String(),
                        GTotal = c.Decimal(precision: 18, scale: 2),
                        DeleteOrderItemsIDs = c.String(),
                    })
                .PrimaryKey(t => t.OrderID)
                .ForeignKey("dbo.Customers", t => t.CustomerID)
                .Index(t => t.CustomerID);
            
            CreateTable(
                "dbo.OrderItems",
                c => new
                    {
                        OrderItemID = c.Long(nullable: false, identity: true),
                        OrderID = c.Long(),
                        ItemID = c.Int(),
                        Quantity = c.Int(),
                    })
                .PrimaryKey(t => t.OrderItemID)
                .ForeignKey("dbo.Items", t => t.ItemID)
                .ForeignKey("dbo.Orders", t => t.OrderID)
                .Index(t => t.OrderID)
                .Index(t => t.ItemID);
            
            CreateTable(
                "dbo.Items",
                c => new
                    {
                        ItemID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Price = c.Decimal(precision: 18, scale: 2),
                    })
                .PrimaryKey(t => t.ItemID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.OrderItems", "OrderID", "dbo.Orders");
            DropForeignKey("dbo.OrderItems", "ItemID", "dbo.Items");
            DropForeignKey("dbo.Orders", "CustomerID", "dbo.Customers");
            DropIndex("dbo.OrderItems", new[] { "ItemID" });
            DropIndex("dbo.OrderItems", new[] { "OrderID" });
            DropIndex("dbo.Orders", new[] { "CustomerID" });
            DropTable("dbo.Items");
            DropTable("dbo.OrderItems");
            DropTable("dbo.Orders");
            DropTable("dbo.Customers");
        }
    }
}
