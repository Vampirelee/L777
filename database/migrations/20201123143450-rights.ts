
import { QueryInterface } from 'sequelize';
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface:QueryInterface, Sequelize) => {
    const { BOOLEAN, INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('rights', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rights_name: {
        type: STRING(255),
        allowNull: true,
        unique: true,
      },
      rights_desc: {
        type: STRING(255),
        allowNull: true,
        unique: false,
      },
      rights_state: {
        type: BOOLEAN,
        allowNull: true,
        unique: false,
        defaultValue: true,
      },
      rights_type: {
        type: STRING(255),
        allowNull: false,
      },
      rights_method: {
        type: STRING(255),
        allowNull: true,
      },
      rights_path: {
        type: STRING(255),
        allowNull: true,
      },
      pid: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      level: {
        type: INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      created_at: {
        type: DATE,
      },
      updated_at: {
        type: DATE,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 rights 表
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('rights');
  },
};
