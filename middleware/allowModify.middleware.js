const allowModify = async (req, res, next) => {
    if(req.userData){
        if(req.userData.isAdmin){
            //admin
            req.userData.allowAccess=true;
        }
    }
  next();
};

module.exports = allowModify;
