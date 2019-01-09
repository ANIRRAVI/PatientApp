const express = require('express');

const { getPatients, getPatientbyID } = require('./Patient/patient-controller');
const { addPatient } = require('./Patient/patient-controller');
const { deletePatientbyID } = require('./Patient/patient-controller');
const { patchPatientbyID } = require('./Patient/patient-controller');


const getRoutes = () => ({
  /*
 * @api [get] /todos
 * scope: public
 * description: "Returns all pets from the system that the user has access to"
 * responses:
 *   "200":
 *     description: "A list of pets."
 *     schema:
 *       type: "String"
 */
  '/api/patients': [ getPatients ],
  '/api/patients/:patientid': [ getPatientbyID ]
});

const postRoutes = () => ({
  '/api/patients': [ addPatient ]
});

const deleteRoutes = () => ({
  '/api/patients/:patientid' : [ deletePatientbyID ]
});

const patchRoutes = () => ({
  '/api/patients/:patientid': [ patchPatientbyID ]
})

const routes = () => ({
  post: postRoutes(),
  get: getRoutes(),
  delete: deleteRoutes(),
  patch: patchRoutes()
});

module.exports.setup = function () {

  const router = express.Router();
  Object.entries(routes()).forEach(([ type, routelist ]) => {
    Object.entries(routelist).forEach(([ key, value ]) => {
      if (type === 'get') {
        router.get(key, value);
      }
      else if (type === 'post') {
        router.post(key, value);
      }
      else if (type === 'delete') {
        router.delete(key, value);
      }
      else if (type === 'patch') {
        router.patch(key, value);
      }
    });
  });

  return router;
};
