package com.revature.caliber.controllers;

import java.util.List;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revature.caliber.beans.Batch;
import com.revature.caliber.beans.Trainee;
import com.revature.caliber.beans.Trainer;
import com.revature.caliber.security.models.SalesforceUser;
import com.revature.caliber.services.TrainingService;

/**
 * Services requests for Trainer, Trainee, and Batch information
 * 
 * @author Patrick Walsh
 *
 */
@RestController
@CrossOrigin(origins = "*")
public class TrainingController {

	private static final Logger log = Logger.getLogger(TrainingController.class);
	private TrainingService trainingService;

	@Autowired
	public void setTrainingService(TrainingService trainingService) {
		this.trainingService = trainingService;
	}
	
	/*
	 *******************************************************
	 * TODO TRAINER SERVICES
	 *
	 *******************************************************
	 */

	/**
	 * Create trainer
	 *
	 * @param trainer
	 * 
	 * @return the response entity
	 */
	@RequestMapping(value = "/vp/trainer/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Trainer> createTrainer(@Valid @RequestBody Trainer trainer) {
		log.info("Saving trainer: " + trainer);
		trainingService.createTrainer(trainer);
		return new ResponseEntity<>(trainer, HttpStatus.CREATED);
	}

	/**
	 * Update trainer
	 *
	 * @param trainer
	 * 
	 * @return the response entity
	 */
	@RequestMapping(value = "/vp/trainer/update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Void> updateTrainer(@Valid @RequestBody Trainer trainer) {
		log.info("Updating trainer: " + trainer);
		trainingService.update(trainer);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	/**
	 * Finds a trainer by email. Used for logging in a user with the Salesforce
	 * controller `
	 * 
	 * @param email
	 * @return
	 */
	@RequestMapping(value = "/training/trainer/byemail/{email}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Trainer> findTrainer(@PathVariable String email) {
		log.info("Find trainer by email " + email);
		Trainer trainer = trainingService.findTrainer(email);
		return new ResponseEntity<>(trainer, HttpStatus.OK);
	}

	/**
	 * Deactivates the trainer
	 * 
	 * @param trainer
	 * @return response entity
	 */
	@RequestMapping(value = "/vp/trainer/delete", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Void> makeInactive(@Valid @RequestBody Trainer trainer) {
		log.info("Updating trainer: " + trainer);
		trainingService.makeInactive(trainer);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	/**
	 * Returns all trainers titles from the database `
	 * 
	 * @return
	 */
	@RequestMapping(value = "/vp/trainer/titles", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<List<String>> getAllTrainersTitles() {
		log.info("Fetching all trainers titles");
		List<String> trainers = trainingService.findAllTrainerTitles();
		return new ResponseEntity<>(trainers, HttpStatus.OK);
	}

	/**
	 * Returns all trainers from the database `
	 * 
	 * @return
	 */
	@RequestMapping(value = "/all/trainer/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<List<Trainer>> getAllTrainers() {
		log.info("Fetching all trainers");
		List<Trainer> trainers = trainingService.findAllTrainers();
		return new ResponseEntity<>(trainers, HttpStatus.OK);
	}

	/*
	 *******************************************************
	 * TODO BATCH SERVICES
	 *
	 *******************************************************
	 */

	/**
	 * Find all batches for the currently logged in trainer
	 * 
	 * @param auth
	 * @return
	 */
	@RequestMapping(value = "/trainer/batch/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<List<Batch>> findAllBatchesByTrainer(Authentication auth) {
		Trainer userPrincipal = getPrincipal(auth);
		log.info("Getting all batches for trainer: " + userPrincipal);
		List<Batch> batches = trainingService.findAllBatches(userPrincipal.getTrainerId());
		return new ResponseEntity<>(batches, HttpStatus.OK);
	}

	/**
	 * Create batch
	 *
	 * @param batch
	 *            the batch
	 * @return the response entity
	 */
	@RequestMapping(value = "/all/batch/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Batch> createBatch(@Valid @RequestBody Batch batch) {
		log.info("Saving batch: " + batch);
		trainingService.save(batch);
		return new ResponseEntity<>(batch, HttpStatus.CREATED);
	}

	/**
	 * Update batch
	 *
	 * @param batch
	 *            the batch
	 * @return the response entity
	 */
	@RequestMapping(value = "/all/batch/update", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Void> updateBatch(@Valid @RequestBody Batch batch) {
		log.info("Updating batch: " + batch);
		trainingService.update(batch);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	/**
	 * Delete batch
	 *
	 * @param id
	 *            the id of the batch to delete
	 * @return the response entity
	 */
	@RequestMapping(value = "/all/batch/delete/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Void> deleteBatch(@PathVariable int id) {
		Batch batch = new Batch();
		batch.setBatchId(id);
		log.info("Deleting batch: " + id);
		trainingService.delete(batch);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	/**
	 * Gets all current batches
	 *
	 * @return the all batches
	 */
	@RequestMapping(value = {
			"/vp/batch/all/current" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<List<Batch>> getAllCurrentBatches() {
		log.info("Fetching all current batches");
		List<Batch> batches = trainingService.findAllCurrentBatches();
		return new ResponseEntity<>(batches, HttpStatus.OK);
	}

	/**
	 * Gets all batches
	 *
	 * @return the all batches
	 */
	@RequestMapping(value = { "/qc/batch/all",
			"/vp/batch/all" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<List<Batch>> getAllBatches() {
		log.info("Fetching all batches");
		List<Batch> batches = trainingService.findAllBatches();
		return new ResponseEntity<>(batches, HttpStatus.OK);

	}

	/**
	 * Adds a new week to the batch. Increments counter of total_weeks in
	 * database
	 * 
	 * @param batchId
	 * @return
	 */
	@RequestMapping(value = "/trainer/week/new/{batchId}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Void> createWeek(@PathVariable int batchId) {
		log.info("Adding week to batch: " + batchId);
		trainingService.addWeek(batchId);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/all/locations", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<List<String>> findCommonLocations() {
		log.info("Fetching common training locations");
		return new ResponseEntity<>(trainingService.findCommonLocations(), HttpStatus.OK);
	}

	/*
	 *******************************************************
	 * TODO TRAINEE SERVICES
	 *
	 *******************************************************
	 */
	@RequestMapping(value = "/all/trainee", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<List<Trainee>> findAllByBatch(@RequestParam(required = true) Integer batch) {
		log.info("Finding trainees for batch: " + batch);
		List<Trainee> trainees = trainingService.findAllTraineesByBatch(batch);
		return new ResponseEntity<>(trainees, HttpStatus.OK);
	}

	@RequestMapping(value = "/all/trainee/dropped", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<List<Trainee>> findAllDroppedByBatch(@RequestParam(required = true) Integer batch) {
		log.info("Finding dropped trainees for batch: " + batch);
		List<Trainee> trainees = trainingService.findAllDroppedTraineesByBatch(batch);
		return new ResponseEntity<>(trainees, HttpStatus.OK);
	}

	/**
	 * Create trainee
	 *
	 * @param trainee
	 *            the trainee
	 * @return the response entity
	 */
	@RequestMapping(value = "/all/trainee/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Trainee> createTrainee(@Valid @RequestBody Trainee trainee) {
		log.info("Saving trainee: " + trainee);
		trainingService.save(trainee);
		return new ResponseEntity<>(trainee, HttpStatus.CREATED);
	}

	/**
	 * Update trainee
	 *
	 * @param trainee
	 *            the trainee
	 * @return the response entity
	 */
	@RequestMapping(value = "/all/trainee/update", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Void> updateTrainee(@Valid @RequestBody Trainee trainee) {
		log.info("Updating trainee: " + trainee);
		trainingService.update(trainee);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	/**
	 * Delete trainee
	 *
	 * @param id
	 *            the id
	 * @return the response entity
	 */
	@RequestMapping(value = "/all/trainee/delete/{id}", method = RequestMethod.DELETE)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Void> deleteTrainee(@PathVariable int id) {
		Trainee trainee = new Trainee();
		trainee.setTraineeId(id);
		log.info("Deleting trainee: " + id);
		trainingService.delete(trainee);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/all/trainee/getByEmail/{traineeEmail}", method = RequestMethod.GET)
	@Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
	public ResponseEntity<Trainee> retreiveTraineeByEmail(@PathVariable String traineeEmail) {
		Trainee trainee = trainingService.findTraineeByEmail(traineeEmail);
		return new ResponseEntity<>(trainee, HttpStatus.OK);
	}

	/**
	 * Convenience method for accessing the Trainer information from the User
	 * Principal.
	 * 
	 * @param auth
	 * @return
	 */
	private Trainer getPrincipal(Authentication auth) {
		return ((SalesforceUser) auth.getPrincipal()).getCaliberUser();
	}
}
