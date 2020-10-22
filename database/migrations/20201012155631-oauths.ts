

import { QueryInterface } from 'sequelize';
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface:QueryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('oauths', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      access_token: {
        type: STRING(255),
        allowNull: true,
      },
      provider: {
        type: STRING(255),
        allowNull: true,
      },
      uid: {
        type: INTEGER,
        allowNull: true,
        unique: true,
      },
      user_id: {
        type: INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('oauths');
  },
};
