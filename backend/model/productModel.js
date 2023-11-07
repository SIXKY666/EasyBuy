const db = require("../config/db");
const permission_conf = require("../config/permission");

module.exports = class user {
  constructor(dataInfo) {
    this.product_id = dataInfo?.product_id || ""
    this.seller_id = dataInfo?.seller_id || null
    this.name = dataInfo?.name || null
    this.description = dataInfo?.description || null
    this.price = dataInfo?.price || 0
    this.category_id = dataInfo?.category_id || null
    this.image_path = dataInfo?.image_path || null
    this.created_at = dataInfo?.created_at || null
  }

  static create(dataInfo) {
    return db.query(
      `
        INSERT 
        INTO        Products
        SET         ?
      `, [dataInfo]
    )
  }

  static getAll() {
    return db.query(
      `
        SELECT * 
        FROM Products 
        ORDER BY created_at DESC
      `,
    )
  }
}
