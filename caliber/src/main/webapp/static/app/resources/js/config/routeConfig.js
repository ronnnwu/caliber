angular
		.module("app")
		.config(
				function($stateProvider, $locationProvider, $urlRouterProvider,
						ChartJsProvider, $logProvider) {

					// Turn on/off debug messages
					$logProvider.debugEnabled(true);

					// chart options
					ChartJsProvider.setOptions({

						chartColors : [ '#803690', '#00ADF9', '#ffff66',
								'#FDB45C', '#949FB1', '#4D5360', '#66ff33',
								'#ff5050' ]

					});

					// go to home on startup
					$urlRouterProvider.otherwise('/routing');

					/***********************************************************
					 * App states
					 **********************************************************/
					$stateProvider
							.state(
									"routing",
									{
										url : "/routing",
										templateUrl : "/static/app/partials/routing.html",
										// uncomment when dev is complete
										onEnter : function(authFactory) {
											authFactory.auth();
										}
									})

							/***************************************************
							 * QC
							 **************************************************/
							.state(
									"qc",
									{
										abstract : true,
										url : "/qc",
										templateUrl : "/static/app/partials/abstracts/qc.html",
										resolve : {
											allBatches : function(
													caliberDelegate) {
												return caliberDelegate.qc
														.getAllBatches();
											}
										},
										// authorize the user
										onEnter : function(authFactory) {
											authFactory.authQC();
										}

									})
							.state(
									"qc.home",
									{
										url : "/home",
										templateUrl : "/static/app/partials/home/qc-home.html",
										controller : "qcHomeController"
									})
							.state(
									"qc.manage",
									{
										url : "/manage",
										views:{
											"":{
												templateUrl : "/static/app/partials/manage/manage-batch.html",
												controller : "trainerManageController"
											},
											"batch-form@trainer.manage" : {
												templateUrl : "/static/app/partials/manage/edit-batch-modal.html"
											},
											"batch-extra-modals@trainer.manage" : {
												templateUrl : "/static/app/partials/manage/batch-axillary-modals.html"
											},
											"view-trainees@trainer.manage":{
												templateUrl : "/static/app/partials/manage/view-trainees-modal.html"
											},
											"trainee-form@trainer.manage":{
												templateUrl : "/static/app/partials/manage/edit-trainee-modal.html"
											},
											"trainee-extra-modals@trainer.manage":{
												templateUrl : "/static/app/partials/manage/trainee-axillary-modals.html"
											}
										}	
									})
							.state(
									"qc.audit",
									{
										url : "/audit",
										views : {
											"" : {
												templateUrl : "/static/app/partials/assess/qc-assess.html",
												controller : "qcAssessController"
											},
											"confirm-add-weeks-modal@qc.audit" : {
												templateUrl: "/static/app/partials/assess/confirm-add-weeks-modal.html"
										}
									}
							})
							.state(
									"qc.reports",
									{
										url : "/reports",
										views : {
											"" : {
												templateUrl : "/static/app/partials/reports.html",
												controller : "allReportController"
											},
											"trainer-display@qc.reports" : {
												templateUrl : "/static/app/partials/trainer-display.html",
												controller : "trainerAssessController"
											},
											"trainee-overall@qc.reports" : {
												templateUrl : "/static/app/partials/trainee-overall.html",
												controller : "allReportController"
											},
											"trainee-week@qc.reports" : {
												templateUrl : "/static/app/partials/trainee-week.html",
												controller : "trainerAssessController"
											},
											"qc-batchOverall@qc.reports" : {
												templateUrl : "/static/app/partials/qc-display.html",
												controller : "qcAssessController"
											}
										}
									})
							/***************************************************
							 * TRAINER
							 **************************************************/
							.state(
									"trainer",
									{
										abstract : true,
										url : "/trainer",
										templateUrl : "/static/app/partials/abstracts/trainer.html",
										resolve : {
											allBatches : function(
													caliberDelegate) {
												return caliberDelegate.trainer
														.getAllBatches();
											}
										},
										// authorize the user
										onEnter : function(authFactory) {
											authFactory.authTrainer();
										}
									})
							.state(
									"trainer.home",
									{
										templateUrl : "/static/app/partials/home/trainer-home.html",
										url : "/home",
										controller : "trainerHomeController"
									})
							.state(
									"trainer.manage",
									{
										
										url : "/manage",
										views:{
											"":{
												templateUrl : "/static/app/partials/manage/manage-batch.html",
												controller : "trainerManageController"
											},
											"batch-form@trainer.manage" : {
												templateUrl : "/static/app/partials/manage/edit-batch-modal.html"
											},
											"batch-extra-modals@trainer.manage" : {
												templateUrl : "/static/app/partials/manage/batch-axillary-modals.html"
											},
											"view-trainees@trainer.manage":{
												templateUrl : "/static/app/partials/manage/view-trainees-modal.html"
											},
											"trainee-form@trainer.manage":{
												templateUrl : "/static/app/partials/manage/edit-trainee-modal.html"
											},
											"trainee-extra-modals@trainer.manage":{
												templateUrl : "/static/app/partials/manage/trainee-axillary-modals.html"
											}
										}	
									})
							.state(
									"trainer.assess",
									{
										url : "/assess",
										views:{
											""	:{
												templateUrl : "/static/app/partials/assess/trainer-assess.html",											
												controller : "trainerAssessController"
											},
											"trainer-edit-assess@trainer.assess":{
												templateUrl :"/static/app/partials/assess/trainer-edit-assess.html",				
											},
											"confirm-add-weeks-modal@trainer.assess":{
												templateUrl :"/static/app/partials/assess/confirm-add-weeks-modal.html",

											}
										}
									})
							.state(
									"trainer.reports",
									{
										url : "/reports",
										views : {
											"" : {
												templateUrl : "/static/app/partials/reports.html",
												controller : "allReportController"
											},
											"trainer-display@trainer.reports" : {
												templateUrl : "/static/app/partials/trainer-display.html",
												controller : "trainerAssessController"
											},
											"trainee-overall@trainer.reports" : {
												templateUrl : "/static/app/partials/trainee-overall.html",
												controller : "allReportController"
											},
											"trainee-week@trainer.reports" : {
												templateUrl : "/static/app/partials/trainee-week.html",
												controller : "allReportController"
											},
											"qc-batchOverall@trainer.reports" : {
												templateUrl : "/static/app/partials/qc-display.html",
												controller : "qcAssessController"
											}
										}
									})

							/***************************************************
							 * VP
							 **************************************************/
							.state(
									"vp",
									{
										abstract : true,
										url : "/vp",
										templateUrl : "/static/app/partials/abstracts/vp.html",
										resolve : {
											allBatches : function(
													caliberDelegate) {
												return caliberDelegate.vp
														.getAllBatches();
											}
										},
										// authorize the user
										onEnter : function(authFactory) {
											authFactory.authVP();
										}

									})
							.state(
									"vp.home",
									{
										templateUrl : "/static/app/partials/home/vp-home.html",
										url : "/home",
										controller : "vpHomeController"
									})
							.state(
									"vp.manage",
									{
										url : "/manage",
										views:{
											"":{
												templateUrl : "/static/app/partials/manage/manage-batch.html",
												controller : "trainerManageController"
											},
											"batch-form@trainer.manage" : {
												templateUrl : "/static/app/partials/manage/edit-batch-modal.html"
											},
											"batch-extra-modals@trainer.manage" : {
												templateUrl : "/static/app/partials/manage/batch-axillary-modals.html"
											},
											"view-trainees@trainer.manage":{
												templateUrl : "/static/app/partials/manage/view-trainees-modal.html"
											},
											"trainee-form@trainer.manage":{
												templateUrl : "/static/app/partials/manage/edit-trainee-modal.html"
											},
											"trainee-extra-modals@trainer.manage":{
												templateUrl : "/static/app/partials/manage/trainee-axillary-modals.html"
											}
										}	
									})
							.state(
									"vp.assess",
									{
										templateUrl : "/static/app/partials/assess/trainer-assess.html",
										url : "/assess",
										controller : "trainerAssessController"
									})
							.state(
									"vp.audit",
									{
										templateUrl : "/static/app/partials/assess/qc-assess.html",
										url : "/audit",
										controller : "qcAssessController"
									})
							.state(
									"vp.reports",
									{
										url : "/reports",
										views : {
											"" : {
												templateUrl : "/static/app/partials/reports.html",
												controller : "allReportController"
											},
											"trainer-display@vp.reports" : {
												templateUrl : "/static/app/partials/trainer-display.html",
												controller : "trainerAssessController"
											},
											"trainee-overall@vp.reports" : {
												templateUrl : "/static/app/partials/trainee-overall.html",
												controller : "allReportController"
											},
											"trainee-week@vp.reports" : {
												templateUrl : "/static/app/partials/trainee-week.html",
												controller : "trainerAssessController"
											},
											"qc-batchOverall@vp.reports" : {
												templateUrl : "/static/app/partials/qc-display.html",
												controller : "qcAssessController"
											}
										}
									})
				});