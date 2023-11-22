const HealthManager = async (req, res) => {
    res.json({ "status": "Health OK" });
};

module.exports = {
  HealthManager,
};
