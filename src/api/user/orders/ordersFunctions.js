
const prices = require("../../defaults/deliveryprice.json");
const db = require("../../../db");

async function getCartOrders(orders=[]){
    let cart_orders = [];
    for (const order of orders) {
        const product_query = await db.query(
        `SELECT product_id, product_name, price,supplier_id FROM products WHERE product_id=$1`,
            [order.product_id]
        );
        const product = product_query.rows[0];
        cart_orders.push({ ...product, quantity: parseInt(order.quantity) });
    }
    return cart_orders
}



function getProductCost(orders = []){
    const total = orders.reduce((cost,order)=>{
        return parseInt(cost) + parseInt(order.price * order.quantity)
    },0)
    return parseInt(total)
}

async function getAddress(address_id){
    const addressquery = await db.query(`SELECT address_id, city_id, street_name, details 
    FROM address
    WHERE address.address_id = $1
    `,[address_id])

    const address = addressquery.rows[0];
    return address
}

function getNumberOfSuppliers(orders=[], address){
    if(!address || !address.city_id) throw "Address Not Provided"

    const allSuppliers = orders.reduce((suppliers, order) => {
        if (suppliers.includes(order.supplier_id)) return suppliers;
        return [...suppliers, order.supplier_id];
    }, []);
    
    const sameCitySuppliers = orders.reduce((suppliers, order) => {
        if (suppliers.includes(order.supplier_id)) return suppliers;
        if(order.city_id !== address.city_id) return suppliers;
        return [...suppliers, order.supplier_id];
    }, []);

    const numOfSuppliers = allSuppliers.length
    const sameCity = parseInt(sameCitySuppliers.length)
    const differentCity =  numOfSuppliers - sameCity
    return {sameCity, differentCity}
}

function getDeliveryCharge({sameCity=0, differentCity=0}) {
    const deliveryCharge = (prices.INSIDECITY * sameCity) + (prices.OUTSIDECITY * differentCity);
    return deliveryCharge
}

async function getOrderWithCity(orders=[]){
    let cart_orders = [];
    for (const order of orders) {
        const product_query = await db.query(
        `SELECT product_id, product_name, price,products.supplier_id,suppliers.city_id 
        FROM products,suppliers WHERE product_id=$1 AND
        products.supplier_id=suppliers.supplier_id`,
            [order.product_id]
        );
        
        const product = product_query.rows[0];
        if(!product) continue;
        cart_orders.push({ ...product, quantity: parseInt(order.quantity) });
    }
    return cart_orders
}



module.exports = {
    getCartOrders,
    getDeliveryCharge,
    getNumberOfSuppliers,
    getProductCost,
    getOrderWithCity,
    getAddress
}