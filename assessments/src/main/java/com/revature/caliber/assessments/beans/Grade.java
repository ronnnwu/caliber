package com.revature.caliber.assessments.beans;

import java.util.Date;

public class Grade {

	private long gradeId;
	private Assessment assessment;
	private int trainee;
	private Date dateReceived;
	private int score;
	public long getGradeId() {
		return gradeId;
	}
	public void setGradeId(long gradeId) {
		this.gradeId = gradeId;
	}
	public Assessment getAssessment() {
		return assessment;
	}
	public void setAssessment(Assessment assessment) {
		this.assessment = assessment;
	}
	public int getTrainee() {
		return trainee;
	}
	public void setTrainee(int trainee) {
		this.trainee = trainee;
	}
	public Date getDateReceived() {
		return dateReceived;
	}
	public void setDateReceived(Date dateReceived) {
		this.dateReceived = dateReceived;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public Grade(long gradeId, Assessment assessment, int trainee, Date dateReceived, int score) {
		super();
		this.gradeId = gradeId;
		this.assessment = assessment;
		this.trainee = trainee;
		this.dateReceived = dateReceived;
		this.score = score;
	}
	public Grade() {
		super();
	}
	public Grade(Assessment assessment, int trainee, Date dateReceived, int score) {
		super();
		this.assessment = assessment;
		this.trainee = trainee;
		this.dateReceived = dateReceived;
		this.score = score;
	}
	
	
	
}
