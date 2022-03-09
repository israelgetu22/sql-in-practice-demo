const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const userId = 18;
const clientId = 3;

module.exports = {
  getUserInfo: (req, res) => {
    sequelize
      .query(
        `
          SELECT * FROM cc_clients AS c
          JOIN cc_users u ON c.user_id = u.user_id
          WHERE u.user_id = ${userId};
        `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  // updateUserInfo: (req,res)=> {
  //   let{
  //     firstName,
  //     lastName,
  //     phoneNumber,
  //     email,
  //     address,
  //     city,
  //     state,
  //     zip_code
  //   } = req.body
  //   sequelize.query(`
  //   UPDATE cc_users
  //   SET first_name = '${firstName}',
  //   last_name = '${lastName}',
  //   email = '${email}',
  //   phone_number = ${phoneNumber}
  //   WHERE user_id = ${userId};
  //   UPDATE  cc_clients
  //   SET address = '${address}',
  //   state = '${state}',
  //   city = '${city}',
  //   zip_code = ${zip_code}
  //   WHERE user_id = ${userId};
  //   `)
  //   .then(() => res.sendStatus(200))
  //   .catch(err => console.log(err))
  // },
  // getUserAppt: (req,res) => {
  //   sequelize.query(`
  //   SELECT * FROM cc_appointment
  //   WHERE client_id = ${clientId}
  //   ORDER BY date DESC;
  //   `)
  //   .then(dbRes => res.status(200).send(dbRes[0]))
  //   .catch(err => console.log(err))
  // },
  // requestAppointment: (req, res) => {
  //   let { date, service } = req.body;
  //   sequelize
  //     .query(
  //       `
  //   INSERT INTO cc_appointments (client_id,date,service,notes, approved,completed)
  //   VALUES (${clientId}, '${date}'),'${service}','',false,false)
  //   RETURNING *;
  //   `
  //     )
  //     .then((dbRes) => res.status(200).send(dbRes[0]))
  //     .catch((err) => console.log(err));
  //},
};
