module.exports.dashboard = async(req, res) => {
    let userData = await User.findById(req.signedCookies.userId);

    res.render("/weather", {
        userData: userData,
    });
};