angular.module("api").factory("allFactory", function($log, $http) {

	$log.debug("Booted all api factory");

	var all = {};
	
	/****************************************************************
	 * Server generates PDF from HTML 
	 * Download via response data
	 *
	 ****************************************************************/
	all.generatePDF = function(html) {
		return $http({
			url : "/report/generate",
			method : "POST",
			data : html,
			responseType: "arraybuffer"
		}).then(function(response) {
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/** ************************* Enum constants *********************** */
	all.enumCommonLocations = function() {
		return $http({
			url : "/all/locations",
			method : "GET"
		}).then(function(response) {
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	all.enumAssessmentType = function() {
		return $http({
			url : "/types/assessment/all",
			method : "GET"
		}).then(function(response) {
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	all.enumNoteType = function() {
		return $http({
			url : "/types/note/all",
			method : "GET"
		}).then(function(response) {
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	all.enumQCStatus = function() {
		return $http({
			url : "/types/qcstatus/all",
			method : "GET"
		}).then(function(response) {
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	all.enumSkillType = function() {
		return $http({
			url : "/types/skill/all",
			method : "GET"
		}).then(function(response) {
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	all.enumTrainingStatus = function() {
		return $http({
			url : "/types/trainingstatus/all",
			method : "GET"
		}).then(function(response) {
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	all.enumTrainingType = function() {
		return $http({
			url : "/types/training/all",
			method : "GET"
		}).then(function(response) {
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/**
	 * @param allcategories
	 * @returns {*}
	 */

	all.getAllCategories = function() {
		return $http({
			url : "/category/all/",
			method : "GET"
		}).then(function(response) {
			$log.debug("Categories successfully retrieved.");
			$log.debug(response.data);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/** ************************* Batch *********************** */

	/**
	 * 
	 * @param batchObj
	 */
	all.createBatch = function(batchObj) {
		return $http({
			url : "/all/batch/create",
			method : "POST",
			data : batchObj
		}).then(function(response) {
			$log.debug("Object successfully created");
			$log.debug(response);
			// return id
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/**
	 * 
	 * @param batchObj
	 * @returns {*}
	 */
	all.updateBatch = function(batchObj) {
		return $http({
			url : "/all/batch/update",
			method : "PUT",
			data : batchObj
		}).then(function(response) {
			$log.debug("Object successfully updated");
			$log.debug(response);
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/**
	 * 
	 * @param batchId
	 * @returns {*}
	 */
	all.deleteBatch = function(batchId) {
		return $http({
			url : "/all/batch/delete" + batchId,
			method : "DELETE"
		}).then(function(response) {
			$log.debug("Batch successfully deleted");
			$log.debug(response);
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/** ************************* Trainee *********************** */

	/**
	 * 
	 * @param traineeObj
	 * @returns {*}
	 */
	all.createTrainee = function(traineeObj) {
		return $http({
			url : "/all/trainee/create",
			method : "POST",
			data : traineeObj
		}).then(function(response) {
			$log.debug("Trainee successfully created.")
			$log.debug(response);
			// return id
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/**
	 * 
	 * @param traineeObj
	 * @returns {*}
	 */
	all.updateTrainee = function(traineeObj) {
		return $http({
			url : "/all/trainee/update",
			method : "PUT",
			data : traineeObj
		}).then(function(response) {
			$log.debug("Trainee successfully updated.");
			$log.debug(response);
		}, function(response) {
			$log.error("There was an error: " + response.status);
			return false;
		});
	};

	/**
	 * 
	 * @param traineeId
	 */
	all.deleteTrainee = function(traineeId) {
		$http({
			url : "/all/trainee/delete/" + traineeId,
			method : "DELETE"
		}).then(function(response) {
			$log.debug("Trainee successfully deleted.");
			$log.debug(response);
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/** ************************ Grades ************************* */

	/**
	 * Gets all grades for a given Assessment
	 * 
	 * @param assessmentId
	 * @returns {*}
	 */
	all.getGrades = function(assessmentId) {
		return $http({
			url : "/all/grades/assessment/" + assessmentId,
			method : "GET"
		}).then(function(response) {
			$log.debug("Grades successfully retrieved.");
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};
	all.getGradesForWeek = function(batchId, weekId) {
		return $http({
			url : "/all/grades/batch/" + batchId + "/week/" + weekId,
			method : "GET"
		}).then(function(response) {
			$log.debug("Grades for week successfully retrieved.");
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};

	/** *********************** Trainer ********************* */

	/**
	 * 
	 * @returns {*}
	 */
	all.getAllTrainers = function() {
		return $http({
			url : "/all/trainer/all/",
			method : "GET"
		}).then(function(response) {
			$log.debug("Trainers successfully retrieved");
			$log.debug(response);
			return response.data;
		}, function(response) {
			$log.error("There was an error: " + response.status);
		});
	};
	return all;
});