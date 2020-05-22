const mongoose = require('mongoose');
const Order = require('../model/orders');


//getall order controller
module.exports.getOrder = async function(req,res){
  try{
    let order  = await Order.find({})
    .sort('-createdAt');

    return res.json(200,{
      orders:order
    });

  }catch(err){
    console.log("Error while fetching products ",err);
    return res.json(400,{
      status: "Error fetching orders!!"
      })
    }
};

//get order by id controller
module.exports.getSpecificOrder = async function(req,res){
  try{
    let order = await Order.findById(req.params.id)

    if(order){
      return res.json(200,{
        order:order,
        status: `success fetcing order with id ${req.params.id}`
      })
    }
    if(!order){
      return res.json(404,{
        status: "No product with given id found!"
      })
    }

  }catch(err){
    console.log("error fetching specific Order--> ", err);
    return res.json(500,{
      status: "Internal server error in getSpecificOrder!!"
    })
  }


}

//add product controller
module.exports.addOrder = async function(req,res){
    try{
      let order = await Order.create({
        name: req.body.name,
        quantity: req.body.quantity,
        address: req.body.address,
        pay_mode: req.body.pay_mode

    });
      return res.json(200,{order}
    )

    }catch(err){
      console.log("Error adding product",err);
      return res.json(500,{
          message:"Internal server error"
      });
    }
};

//updateOrder Controller  --(Open feature, considering it or not is your choice)
module.exports.updateOrder = function(req,res){
    const qty = parseInt(req.query.number);
    Order.findByIdAndUpdate(req.params.id, {$inc:{quantity:qty}},{new:true}, function(err, order){
      if(err){
        console.error("Error",err);
        return res.redirect("/");
      }
        return res.json({
          data:{
            order: order,
            message: "product details updated succesfully"
        }});
        
    });  
};

//deleteOrder Controller
module.exports.deleteOrder = function(req, res) {
    Order.findByIdAndRemove(req.params.id, function(err) {
      if (err){
        console.error("Error Deleting Order-->",err);
        return res.json(400, {
          status:"Error deleting the product!"
        })
      }else{
        return res.json({
            data:{
                message:"order deleted"
            }
        });
      }
    });
};