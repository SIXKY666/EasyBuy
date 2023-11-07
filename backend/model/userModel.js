const db = require("../config/db");
const permission_conf = require("../config/permission");

module.exports = class user {
  constructor(dataInfo) {
    this.customer_id = dataInfo?.customer_id || ""
    this.first_name = dataInfo?.first_name || ""
    this.last_name = dataInfo?.last_name || ""
    this.email = dataInfo?.email || ""
    this.password = dataInfo?.password || ""
    this.address = dataInfo?.address || ""
    this.phone = dataInfo?.phone || ""
  }

  static create(dataInfo) {
    return db.query(
      `
        INSERT 
        INTO        Customers
        SET         ?
      `, [dataInfo]
    )
  }

  static getUserByEmail(email) {
    return db.query(
      `
        SELECT customer_id,email,password 
        FROM Customers 
        WHERE email = ?
      `, [email],
    )
  }
}
