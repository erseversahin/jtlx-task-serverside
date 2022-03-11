import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User";
import CustomError from "../helpers/error/CustomError";
import expressAsyncHandler from "express-async-handler";


export const uploadImage = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      {
        image: req.file?.filename,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (user) {
      res.status(200).json({
        success: true,
        image: user.image,
      });
    }

    return next(new CustomError("Something went wrong!", 400));
  }
);




export const getProfile = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.id) {
      const userData = await UserModel.findOne({ _id: req.user.id });
      res.status(200).json({
        success: true,
        userData,
      });
    }
      return next(new CustomError("There is no such user.", 400));
  }
);


export const editProfile = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {

      const user = await UserModel.findByIdAndUpdate(
          req.user.id,
          {
              location: {
                  type: "Point",
                  coordinates: req.body.location.coordinates
              },
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              balance: req.body.balance,
              phoneNumber: req.body.phoneNumber,
              username: req.body.username,
          },
          {
              new: true,
              runValidators: true,
          }
      );

      if (user) {
          res.status(200).json({
              success: true,
              user,
          });
      }

      return next(new CustomError("Something went wrong!", 400));
  }
);
