package com.humidity.server.Service;

import com.humidity.server.Entity.HumidityEntity;
import com.humidity.server.Repository.HumidityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class HumidityService {
    @Autowired
    private HumidityRepository humidityRepository;

    public void saveHumidity(String sensorId, Integer sensorData) {
        var humidity = HumidityEntity.builder()
                .sensorId(sensorId)
                .data(sensorData)
                .atTime(new Date().getTime())
                .build();

        humidityRepository.save(humidity);
    }

    public List<HumidityEntity> getAllSensorHumiditiesList(String sensorId) {
        var humiditiesList = humidityRepository.findBySensorId(sensorId);

        return humiditiesList;
    }
}
