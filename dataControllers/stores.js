const db = require("../models/farmer");

module.exports.getStores = async function (id) {
    try {
        const storesData = await db.Farmer.find({ user_id: id });
        return ({ success: true, storesData });
    } catch (err) {
        return ({ success: false, message: `${err.name}: ${err.errmsg}` });
    }

}

