using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cgWebShopApi.Migrations
{
    /// <inheritdoc />
    public partial class updateContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProduct_Orders_OrderId",
                table: "OrderedProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProduct_Products_ProductId",
                table: "OrderedProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderedProduct",
                table: "OrderedProduct");

            migrationBuilder.RenameTable(
                name: "OrderedProduct",
                newName: "OrderedProducts");

            migrationBuilder.RenameIndex(
                name: "IX_OrderedProduct_ProductId",
                table: "OrderedProducts",
                newName: "IX_OrderedProducts_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderedProduct_OrderId",
                table: "OrderedProducts",
                newName: "IX_OrderedProducts_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderedProducts",
                table: "OrderedProducts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProducts_Orders_OrderId",
                table: "OrderedProducts",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProducts_Products_ProductId",
                table: "OrderedProducts",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProducts_Orders_OrderId",
                table: "OrderedProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderedProducts_Products_ProductId",
                table: "OrderedProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OrderedProducts",
                table: "OrderedProducts");

            migrationBuilder.RenameTable(
                name: "OrderedProducts",
                newName: "OrderedProduct");

            migrationBuilder.RenameIndex(
                name: "IX_OrderedProducts_ProductId",
                table: "OrderedProduct",
                newName: "IX_OrderedProduct_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderedProducts_OrderId",
                table: "OrderedProduct",
                newName: "IX_OrderedProduct_OrderId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OrderedProduct",
                table: "OrderedProduct",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProduct_Orders_OrderId",
                table: "OrderedProduct",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedProduct_Products_ProductId",
                table: "OrderedProduct",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
