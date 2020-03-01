const Medal = require("../models/medal");

const medalCtrl = {};

medalCtrl.getMedals = async (req, res, next) => {
    const medals = await Medal.find();
    res.json(medals);
};

medalCtrl.createMedal = async (req, res, next) => {
    const medal = new Medal({
        medalid: req.body.medalid,
        medalname: req.body.medalname,
        medaldesc: req.body.medaldesc
    });
    await medal.save();
    res.json({ status: "Medal created" });
};

medalCtrl.getMedal = async (req, res, next) => {
    const { medalid } = req.params;
    const medal = await Medal.findOne({ medalid: medalid });
    res.json(medal);
};

medalCtrl.editMedal = async (req, res, next) => {
    const { id } = req.params;
    const medal = {
        medalid: req.body.medalid,
        medalname: req.body.medalname,
        medaldesc: req.body.medaldesc
    };
    await Medal.findByIdAndUpdate(id, { $set: medal }, { new: true });
    res.json({ status: "Medal Updated" });
};

medalCtrl.deleteMedal = async (req, res, next) => {
    await Medal.findByIdAndRemove(req.params.id);
    res.json({ status: "Medal Deleted" });
};

module.exports = medalCtrl;
