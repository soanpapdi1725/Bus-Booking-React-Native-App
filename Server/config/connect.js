import mongoose from "mongoose";

export const mongoConnect = async (url) => {
  return mongoose.connect(url);
};
