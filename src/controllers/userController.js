import userModel from '../models/userModel.js';
import appError from '../validations/appError.js';

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req?.userId });
    if (user?.length <= 0) {
      return res.status(404).send({
        success: false,
        msg: 'User not found',
        data: {}
      });
    }
    res.status(200).send({
      success: true,
      msg: 'success',
      data: user
    });
  } catch (error) {
    appError(res, error);
  }
};
export const getAllUser = async (req, res) => {
  try {
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;
    const skip = (page - 1) * limit;

    const user = userModel.find({}).skip(skip).limit(limit);
    const count = userModel.countDocuments({});
    const [userVal, countVal] = await Promise.allSettled([user, count]);
    if (user?.length <= 0) {
      return res.status(404).send({
        success: false,
        msg: 'User not found',
        data: {}
      });
    }
    res.status(200).send({
      success: true,
      msg: 'success',
      data: { user: userVal?.value, count: countVal?.value }
    });
  } catch (error) {
    appError(res, error);
  }
};
