package com.revature.caliber.assessments.service.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.revature.caliber.assessments.beans.Note;
import com.revature.caliber.assessments.data.Facade;

public class NoteServiceImpl {

	private Facade facade;

    @Autowired
    public void setFacade(Facade facade) {
        this.facade = facade;
    }
    
    public Note getNote(String note){return facade.getNote(note);}
    
    public List<Note> getAllNotes(){return facade.getAllNotes();}
}