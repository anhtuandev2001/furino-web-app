import { Sequelize } from 'sequelize';

const pgUri = process.env.POSTGRES_URL || '';

const sequelize = new Sequelize(pgUri, {
  dialect: 'postgres',
  dialectOptions: { useUTC: false },
  timezone: '+7:00',
  logging: false,
});

export default sequelize;
