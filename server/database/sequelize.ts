import { Sequelize } from 'sequelize';

const pgUri = process.env.PG_URI || '';

const sequelize = new Sequelize(pgUri, {
  dialect: 'postgres',
  dialectOptions: { useUTC: false },
  timezone: '+7:00',
  logging: false,
});

export default sequelize;
