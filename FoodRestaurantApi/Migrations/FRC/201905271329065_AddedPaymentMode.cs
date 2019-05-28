namespace FoodRestaurantApi.Migrations.FRC
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedPaymentMode : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PaymentModes",
                c => new
                    {
                        PaymentID = c.Long(nullable: false, identity: true),
                        PayMode = c.String(),
                    })
                .PrimaryKey(t => t.PaymentID);
            
            AddColumn("dbo.Orders", "PaymentMode_PaymentID", c => c.Long());
            CreateIndex("dbo.Orders", "PaymentMode_PaymentID");
            AddForeignKey("dbo.Orders", "PaymentMode_PaymentID", "dbo.PaymentModes", "PaymentID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "PaymentMode_PaymentID", "dbo.PaymentModes");
            DropIndex("dbo.Orders", new[] { "PaymentMode_PaymentID" });
            DropColumn("dbo.Orders", "PaymentMode_PaymentID");
            DropTable("dbo.PaymentModes");
        }
    }
}
