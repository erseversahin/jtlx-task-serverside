import express, {Request, Response, NextFunction, query} from "express";
import { UserModel } from "../models/User";
import CustomError from "../helpers/error/CustomError";
import expressAsyncHandler from "express-async-handler";

export const getUser = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params.id);
        const userData = await UserModel.findOne({ _id: req.params.id });

        if (userData){
            res.status(200).json({
                success: true,
                userData,
            });
        }else{
            return next(new CustomError("There is no such user.", 400));
        }


    }
);

export const addUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const model = new UserModel(req.body);
    const addedData = await model.save();
      res.status(200).json({
          success: true,
          addedData,
      });
  }
);


export const listUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {

      const pagination:any = {};
      const total:any = await UserModel.countDocuments();

      const page:number = parseInt(<string>req.query.page) || 1
      const limit:any = parseInt(<string>req.query.limit) || 10
      const startIndex:any =  (page - 1) * limit
      const endIndex:any = page * limit;

      pagination.total = total;

      if (startIndex > 0){
          pagination.previous = {
              page : page - 1,
              limit : limit
          }
      }

      if (endIndex < total){
          pagination.next = {
              page : page + 1,
              limit : limit
          }
      }

      const users = await UserModel.find({}).skip(startIndex).limit(limit);
      if (users){

          res.status(200).json({
              success: true,
              users,
              count: query.length,
              pagination
          });
      }else{
          return next(new CustomError("There is no such user.", 400));
      }

  });

export const removeUser = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
      const userData = await UserModel.remove({ _id: req.params.id });
      if (userData){
          res.status(200).json({
              success: true,
              message: "User deleted",
              ...userData
          });
      }

      return next(new CustomError("There is no such user.", 400));

  }
);

export const editUser = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const user = await UserModel.findByIdAndUpdate(
            req.user.id,
            {
                location: {
                    type: "Point",
                    coordinates: req.body.coordinates
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
