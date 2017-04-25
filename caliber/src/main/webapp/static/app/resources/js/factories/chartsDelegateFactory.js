/**
 * 
 * @param $log
 * @param hbarChartFactory
 * @param radarChartFactory
 * @param lineChartFactory
 * @returns {{}}
 */
angular
		.module("delegate")
		.factory(
				"chartsDelegate",
				function($log, doughnutChartFactory, doughnutChartDataFactory,
						barChartFactory, barChartDataFactory,
						radarChartFactory, radarChartDataFactory,
						lineChartFactory, lineChartDataFactory) {
					$log.debug("Booted charts delegate");

					var delegate = {};
					delegate.doughnut = {};
					delegate.doughnut.data = {};
					delegate.bar = {};
					delegate.bar.data = {};
					delegate.radar = {};
					delegate.radar.data = {};
					delegate.line = {};
					delegate.line.data = {};
					delegate.utility = {};

					/**
					 * ********************* Doughnut
					 * *************************************
					 */
					delegate.doughnut.getQCStats = function(dataArray) {
						return doughnutChartFactory.batchWeekQCPie(dataArray);
					}

					delegate.doughnut.data.getQCStatsData = function(batchId,
							weekId) {
						return doughnutChartDataFactory.batchWeekQCPie(batchId,
								weekId);
					}

					/**
					 * ************************* Bar *************************
					 */

					// yani barchart
					delegate.bar.getAssessmentAveragesBatchWeekly = function(
							dataArray) {
						return barChartFactory
								.getBatchWeekAvgBarChart(dataArray);
					}
					// yani barchart data
					delegate.bar.data.getAssessmentAveragesBatchWeeklyData = function(
							batchId, week) {
						return barChartDataFactory.getBatchWeekAvgBarChart(
								batchId, week);
					}

					// yani barchart dummy
					delegate.bar.getDummyBarChartDelegate = function(dataArray) {
						return barChartFactory.getDummyBarChart(dataArray);
					};
					// yani barchart data dummy
					delegate.bar.data.getDummyBarData = function() {
						return barChartDataFactory.getDummyBarChartData();
					};
					delegate.bar.getAverageTraineeScoresWeekly = function(
							dataArray) {
						return barChartFactory
								.getBatchWeekSortedBarChart(dataArray);
					}

					delegate.bar.data.getAverageTraineeScoresWeeklyData = function(
							batchId, week) {
						return barChartDataFactory
								.getBatchWeekSortedBarChartData(batchId, week);
					}

					delegate.bar.getAssessmentAveragesTraineeWeekly = function(
							dataArray) {
						return barChartFactory
								.getTraineeWeeklyAssessAvgs(dataArray);
					}

					delegate.bar.data.getAssessmentAveragesTraineeWeeklyData = function(
							batchId, weekNum, traineeId) {
						return barChartDataFactory.batchWeekTraineeAssessBar(
								batchId, weekNum, traineeId);
					}

					delegate.bar.getAssessmentAveragesTraineeOverall = function(
							dataArray) {
						return barChartFactory
								.getTraineeOverallAssessAvgs(dataArray);
					}

					delegate.bar.data.getAssessmentAveragesTraineeOverallData = function(
							batchId, traineeId) {
						return barChartDataFactory
								.batchOverallTraineeAssessBar(batchId,
										traineeId);
					}

					delegate.bar.getAverageTraineeScoresOverall = function(
							dataArray) {
						return barChartFactory
								.getBatchOverallBarChart(dataArray);
					}

					delegate.bar.data.getAverageTraineeScoresOverallData = function(
							batchId) {
						return barChartDataFactory
								.getBatchOverallBarChart(batchId);
					}

					delegate.bar.getAllBatchesCurrentWeekQCStats = function(
							dataArray) {
						return barChartFactory
								.getAllBatchesCurrentWeekQCStats(dataArray);
					}

					delegate.bar.data.getAllBatchesCurrentWeekQCStatsData = function() {
						return barChartDataFactory
								.getAllBatchesCurrentWeekQCStats();
					}

					/**
					 * ************************ Radar ************************
					 */

					delegate.radar.data.getAllTraineesAndBatchRadarChart = function(
							batchId) {
						return radarChartDataFactory
								.getAllTraineesAndBatchRadarChart(batchId);
					}
					delegate.radar.getTechnicalSkillsTraineeWeekly = function(
							dataArray, seriesName) {
						return radarChartFactory.getTraineeUpToWeekRadarChart(
								dataArray, seriesName);
					}

					delegate.radar.data.getTechnicalSkillsTraineeWeeklyData = function(
							week, traineeId) {
						return radarChartDataFactory
								.getTraineeUpToWeekRadarChart(week, traineeId);
					}

					delegate.radar.getTechnicalSkillsTraineeOverall = function(
							dataArray, seriesName) {
						return radarChartFactory.getTraineeOverallRadarChart(
								dataArray, seriesName);
					}

					delegate.radar.data.getTechnicalSkillsTraineeOverallData = function(
							traineeId) {
						return radarChartDataFactory
								.getTraineeOverallRadarChart(traineeId);
					}

					delegate.radar.getTechnicalSkillsBatchOverall = function(
							dataArray, seriesName) {
						return radarChartFactory.getBatchOverallRadarChart(
								dataArray, seriesName);
					}

					delegate.radar.data.getTechnicalSkillsBatchOverallData = function(
							batchId) {
						return radarChartDataFactory
								.getBatchOverallRadarChart(batchId);
					}

					delegate.radar.addRadarToExistingRadar = function(
							currentChartData, otherDataArray, seriesName) {
						return radarChartFactory.addDataToExistingRadar(
								currentChartData, otherDataArray, seriesName);
					}
					//TODO
					delegate.radar.getCombineBatchAndAllTraineeAssess = function (dataSet) {
						return radarChartFactory.createCombineBatchAndAllTrainees(dataSet);
					}
					
					delegate.radar.data.getTraineAndBatchSkillComparisonChart = function(
							batchId, week, traineeId) {
						return radarChartDataFactory
								.getTraineAndBatchSkillComparisonChart(batchId,
										week, traineeId);
					}

					delegate.radar.createFromTwoDataSets = function(
							batchDataSet, traineeDataSet, batchSeriesName,
							trainingSeriesName) {
						return radarChartFactory.createFromTwoDataSets(
								batchDataSet, traineeDataSet, batchSeriesName,
								trainingSeriesName);
					}

					/**
					 * ************************ Line ************************
					 */

					delegate.line.getWeeklyProgressBatchOverall = function(
							dataArray) {
						return lineChartFactory
								.getBatchOverallLineChart(dataArray);
					}

					delegate.line.data.getWeeklyProgressBatchOverallData = function(
							batchId) {
						return lineChartDataFactory
								.getBatchOverallLineChartData(batchId);
					}

					// yani linechart
					delegate.line.getWeeklyProgressTraineeWeekly = function(
							dataArray) {
						return lineChartFactory
								.getTraineeUpToWeekLineChart(dataArray);
					}

					// yani linechartdata
					delegate.line.data.getWeeklyProgressTraineeWeeklyData = function(
							batchId, week, traineeId) {
						return lineChartDataFactory
								.getTraineeUpToWeekLineChart(batchId, week,
										traineeId);
					}
					// vpHome
					delegate.line.getCurrentBatchesAverageScoreChart = function(
							dataArray) {
						return lineChartFactory
								.getCurrentBatchesAverageScoreChart(dataArray);
					}

					// vpHome
					delegate.line.data.getCurrentBatchesAverageScoreChartData = function() {
						return lineChartDataFactory
								.getCurrentBatchesAverageScoreChartData();
					}

					delegate.line.getWeeklyProgressTraineeOverall = function(
							dataArray) {
						return lineChartFactory
								.getTraineeOverallLineChart(dataArray);
					}

					delegate.line.data.getWeeklyProgressTraineeOverallData = function(
							batchId, traineeId) {
						return lineChartDataFactory.getTraineeOverallLineChart(
								batchId, traineeId);

					}

					/**
					 * ************************ Utility ************************
					 */

					delegate.utility.dataToTable = function(chartObject) {
						var tableDataSet = [];
						for (var i = 0; i < chartObject.labels.length; i++) {
							var row = {};
							row.label = chartObject.labels[i];
							row.data = [];
							angular.forEach(chartObject.data, function(value,
									key) {
								row.data.push(value[i]);
							});

							tableDataSet.push(row);
						}

						return tableDataSet;

					}

					return delegate;
				});