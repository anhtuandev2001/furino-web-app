import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Exception from '../exceptions/Exception';
import { Role, User } from '../models/index';

const login = async ({
  email,
  password,
  loginType,
}: {
  email: string;
  password: string;
  loginType: string;
}) => {
  try {
    const user: any = await User.findOne({
      where: {
        email,
      },
      include: [
        {
          model: Role,
        },
      ],
      attributes: ['userId', 'name', 'email', 'password', 'status'],
    });

    if (!user) {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }

    if (!user.status) {
      throw new Exception(Exception.USER_DISABLE);
    }

    const token = jwt.sign(
      {
        data: user,
      },
      process.env.JWT_SECRET || 'default-secret',
      {
        expiresIn: '30 days',
      }
    );

    const adminRole = [0, 1];

    if (loginType === 'admin' && !adminRole.includes(user.roleId)) {
      throw new Exception(Exception.WRONG_ROLE);
    }

    return {
      ...user.dataValues,
      token: token,
      password: 'Not show',
    };
  } catch (exception: any) {
    throw new Exception(exception.message);
  }
};

const register = async ({
  name,
  email,
  password,
  roleId,
  phoneNumber,
}: {
  name: string;
  email: string;
  password: string;
  roleId: number;
  phoneNumber: string;
}) => {
  try {
    const role: any = await Role.findAll();
    if (role.length === 0) {
      await Role.bulkCreate([
        { name: 'superAdmin', roleId: 0 },
        { name: 'admin', roleId: 1 },
        { name: 'shipper', roleId: 2 },
        { name: 'user', roleId: 3 },
      ]);
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Exception(Exception.USER_EXIST);
    }

    const saltRounds = process.env.SALT_ROUNDS || '10';

    const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId: roleId || 3,
      phoneNumber,
    });
    return { ...newUser.dataValues, password: 'Not show' };
  } catch (exception: any) {
    throw new Exception(exception.message);
  }
};

// const getUsers = async (limit, page) => {
//   try {
//     const offset = (page - 1) * limit;
//     const users = await User.findAll({
//       limit: limit,
//       offset: offset,
//       attributes: [
//         'userId',
//         'name',
//         'email',
//         'phoneNumber',
//         'disable',
//         'image',
//       ],
//       include: [{ model: Role }],
//       order: [['userId', 'ASC']],
//     });

//     users.forEach((item) => {
//       item.dataValues.role = item.role.name;
//     });
//     return users;
//   } catch (exception) {
//     throw new Exception(exception.message);
//   }
// };

// const getUserById = async (userId) => {
//   try {
//     const user = await User.findByPk(userId, {
//       include: [{ model: Role }],
//     });
//     if (!user) {
//       throw new Exception(Exception.CANNOT_FIND_USER_BY_ID + ': ' + userId);
//     }
//     const address = await Address.findAll({ where: { userId } });
//     user.dataValues.role = user.role.name;
//     user.dataValues.sizeAddresses = address.length;
//     return user;
//   } catch (exception) {
//     throw new Exception(exception.message);
//   }
// };

// const deleteUser = async (userId) => {
//   try {
//     const user = await User.findByPk(userId);
//     if (!user) {
//       throw new Exception(Exception.USER_NOT_FOUND);
//     }
//     await user.destroy();
//     return null;
//   } catch (exception) {
//     throw new Exception(exception.message);
//   }
// };

// const updateUser = async ({
//   userId,
//   name,
//   email,
//   roleId,
//   image,
//   phoneNumber,
//   disable,
// }) => {
//   try {
//     const user = await User.findByPk(userId, {
//       attributes: ['userId', 'name', 'email', 'phoneNumber', 'image'],
//     });
//     if (!user) {
//       throw new Exception(Exception.USER_NOT_FOUND);
//     }
//     user.name = name ?? user.name;
//     user.email = email ?? user.email;
//     user.roleId = roleId ?? user.roleId;
//     user.phoneNumber = phoneNumber ?? user.phoneNumber;
//     user.disable = disable ?? user.disable;

//     if (image) {
//       const result = await uploadToCloudinary(image);
//       user.image = result.url;
//     }

//     await user.save();
//     return user;
//   } catch (exception) {
//     throw new Exception(exception.message);
//   }
// };

// const changePassword = async ({ userId, password, newPassword }) => {
//   try {
//     if (password === newPassword) {
//       throw new Exception(Exception.WRONG_PASSWORD);
//     }

//     const user = await User.findByPk(userId);
//     if (!user) {
//       throw new Exception(Exception.USER_NOT_FOUND);
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       throw new Exception(Exception.WRONG_PASSWORD);
//     }

//     const hashedPassword = await bcrypt.hash(
//       newPassword,
//       parseInt(process.env.SALT_ROUNDS)
//     );

//     user.password = hashedPassword;

//     await user.save();
//     return user;
//   } catch (exception) {
//     throw new Exception(exception.message);
//   }
// };

export default {
  login,
  register,
  // getUsers,
  // getUserById,
  // deleteUser,
  // updateUser,
  // changePassword,
};
