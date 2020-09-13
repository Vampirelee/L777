

import { QueryInterface } from 'sequelize';
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface:QueryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: {
        type: STRING(30),
        allowNull: true,
        unique: true,
      },
      email: {
        type: STRING(50),
        allowNull: true,
        unique: true,
      },
      phone: {
        type: STRING(30),
        allowNull: true,
        unique: true,
      },
      password: {
        type: STRING(100),
        allowNull: false,
        unique: false,
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  },
};
