const {mongoose} = require('./../../db/mongoose');
const {Patient} = require('./../../models/patient');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const HttpStatus = require('http-status-codes');

module.exports.getPatients = async (req, res) => {
  Patient.find().then((patient) => {
    res.send({patient});
  }, (e) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({
        error: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "We could not able to retrive any Patients for now."
    });
  });
}

module.exports.getPatientbyID = async (req, res) => {
  let id = req.params.patientid;

  if (!ObjectID.isValid(id)) {
    return res.status(HttpStatus.NOT_FOUND)
    .send({
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      description: "Please check your Object ID"
    });
  }

  Patient.findById(id).then((Patient) => {
    if (!Patient) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        description: "We could not find any element for this ID"
      });
    }
    res.send({patient});
  }).catch((e) => {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
      description: "Server Error occured, please retry"
    });
  });
}

module.exports.addPatient = async (req, res) => {
  let newPatient = new Patient ({
    name: req.body.name,
    age: req.body.age,
    outstanding: req.body.outstanding
  });
  newPatient.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please check your request, we could not able to add Patient"
    });
  }).catch((e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please check your request, we could not able to create Patient"
    });
  });
}

module.exports.deletePatientbyID = async (req, res) => {
  let patientid = req.params.patientid;
  if (!ObjectID.isValid(patientid)) {
    return res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please check your request, the Object ID is invalid"
    });
  }

  Patient.findByIdAndRemove(patientid).then((Patient) => {
    if (!Patient) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        description: "We could not find any element for this ID"
      });
    }

    res.send({Patient});
  }).catch((e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please try again, we could not able to remove any Patient now."
    });
  });
}

module.exports.patchPatientbyID = async (req, res) => {
  let patientid = req.params.patientid;
  let body = _.pick(req.body, ['name', 'age', 'outstanding']);

  if (!ObjectID.isValid(patientid)) {
    return res.status(HttpStatus.NOT_FOUND).send({
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      description: "The Object id Looks invalid"
    });
  }

  Patient.findByIdAndUpdate(patientid, {$set: body}, {new: true}).then((Patient) => {
    if (!Patient) {
      return res.status(HttpStatus.NOT_FOUND).send({
        error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
        description: "We could not update any element for this ID"
      });
    }
    res.send({Patient});
  }).catch((e) => {
    res.status(HttpStatus.BAD_REQUEST).send({
      error: HttpStatus.BAD_REQUEST,
      description: "Please try again, we could not able to update any Patient now."
    });
  })
}
