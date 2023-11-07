const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const User = require("../model/userModel.js")

exports.register = async (req, res) => {
  const { first_name, last_name, email, password, address, phone } = req.body;

  try{
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User()
    newUser.customer_id = uuidv4()
    newUser.first_name = first_name
    newUser.last_name = last_name
    newUser.email = email
    newUser.password = hashedPassword
    newUser.address = address
    newUser.phone = phone

    const [user] = await User.create(newUser)

    if(user){
      res.status(200).json({
        status: 200,
        message: "User created",
      })
    }else{
      res.status(404).json({
        status: 404,
        message: "Error",
      })
    }
  }catch(error){
    res.status(500).json({
      status: 500,
      message: error.message
    })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req?.body;

  try{
    const [user] = await User.getUserByEmail(email)

    if(user[0]){
      const passwordMatch = bcrypt.hashSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      var currentDate = new Date();
      const expirationDate = new Date();
      expirationDate.setMonth(currentDate.getMonth() + 1);
      var expirationTimeInSeconds = Math.floor(expirationDate.getTime() / 1000);

      const token = jwt.sign({ customer_id: user[0].customer_id,email:user[0].email }, process.env.SECRET_KEY, { expiresIn: expirationTimeInSeconds });
      res.status(200).json({ token });
    }else{
      res.status(404).json({
        status: 404,
        message: "Invalid email or password",
      })
    }
  }catch(error){
    res.status(500).json({
      status: "error",
      message: error.message
    })
  }
}