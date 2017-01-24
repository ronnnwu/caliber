package com.revature.caliber.assessments.data;

import java.util.List;

import com.revature.caliber.assessments.beans.BatchNote;

public interface BatchNoteDAO {
	
	//Creates BatchNotes for QC using both the batchID, and the weekID
	void createBatchNote(BatchNote batchNote);
	
	//Get BatchNote using both batchID, and the weekID  
	BatchNote getBatchNote(int batchId, int weekId);	
	
	//Create a List of all BatchNotes for every batch within a week 
	List<BatchNote> allBatchNotesByWeek(int weekId);
	
	//Create a List of BatchNotes for a single batch
	List<BatchNote> allBatchNotes(int batchId);
	
	//Update a BatchNote
	void updateBatchNote(BatchNote batchNote);
	
	//Delete a BatchNote
	void deleteBatchNote(BatchNote batchNote);
}
