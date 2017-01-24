package com.revature.caliber.assessments.data.implementations;


import com.revature.caliber.assessments.data.QCStatusDAO;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository(value = "qcStatusDAO")
public class QCStatusDAOImpl implements QCStatusDAO {

    SessionFactory sessionFactory;

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void getAll() {
    	
    }

    @Override
    public void getByID(short statusId) {

    }

}
