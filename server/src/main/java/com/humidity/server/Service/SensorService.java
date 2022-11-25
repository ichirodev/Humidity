package com.humidity.server.Service;

import com.humidity.server.Entity.SensorEntity;
import com.humidity.server.Repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SensorService {
    @Autowired
    SensorRepository sensorRepository;

    public void registerSensor(String name) {
        var newSensor = SensorEntity.builder()
                        .name(name)
                        .build();

        sensorRepository.save(newSensor);
    }

    public List<SensorEntity> getAllSensorsByName() {
        return sensorRepository.findAll();
    }
}
