/**
 * API that makes qc related AJAX calls to the backend
 * 
 * @param $log
 * @param $http
 * @returns {{}}
 */
angular.module("api").factory("qcFactory", function($log, $http) {
	$log.debug("Booted QC API Factory");

	var qc = {};

	/** ************************* Batch *********************** */
	qc.getAllBatches = function() {
		return $http({
			url : "/qc/batch/all",
			method : "GET"
		}).then(function(response) {
			$log.log("Batches retrieved successfully");
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};
	
	// Call EvaluationController's getAllQCBatchNotes method
	qc.getAllQCBatchNote = function(batchId) {
		return $http({
			url : "/qc/batch/note/" + batchId,
			method : "GET"
		}).then(function(response) {
			$log.log("QC Batch Note retrieved successfully");
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};
	
	// Call EvaluationController's getAllQCTraineeNotes method
	qc.getAllQCTraineeNote = function(batchId) {
		return $http({
			url : "/qc/trainee/note/" + batchId,
			method : "GET"
		}).then(function(response) {
			$log.log("QC Trainee Note retrieved successfully");
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/** ************************* Grade *********************** */
	// add a new grade
	qc.addGrade = function(gradeObj) {
		return $http({
			url : "/qc/grade/create",
			method : "POST",
			data : gradeObj
		}).then(function(response) {
			$log.debug("Grades added successfully");
			$log.debug(response);
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	// update grade
	qc.updateGrade = function(gradeObj) {
		return $http({
			url : "/qc/grade/update",
			method : "PUT",
			data : gradeObj
		}).then(function(response) {
			$log.debug("Grade updated successfully");
			$log.debug(response);
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/** *********************** Assessment ********************** */
	// get all assessments by batchid
	qc.getAssessmentsByBatchId = function(batchId) {
		$log.debug("In assessment");
		return $http({
			url : "/qc/assessment/byBatchId/" + batchId,
			method : "GET"
		}).then(function(response) {
			$log.debug("Assessments retrieved successfully");
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	// get all assessments
	qc.getAllAssessments = function(weekId) {
		return $http({
			url : "/qc/assessment/byWeek/" + weekId,
			method : "GET"
		}).then(function(response) {
			$log.debug("Assessments retrieved successfully");
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/** ************************ Notes ************************ */
	// create note
	qc.createNote = function(noteObj) {
		return $http({
			url : "/qc/assessment/note/create",
			method : "POST",
			data : noteObj
		}).then(function(response) {
			$log.debug("Note created successfully");
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	//
	/**
	 * Update note
	 * 
	 * @param noteObj
	 * @returns {*}
	 */
	qc.updateNote = function(noteObj) {
		return $http({
			url : "/qc/assessment/note/update",
			method : "PUT",
			data : noteObj
		}).then(function(response) {
			$log.debug("Note updated successfully");
			$log.debug(response);
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};
	return qc;
});