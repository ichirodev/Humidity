package com.humidity.server.Controller;

import com.humidity.server.Entity.SensorEntity;
import com.humidity.server.Service.HumidityService;
import com.humidity.server.Service.SensorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
public class HumidityController {
    Logger logger = LoggerFactory.getLogger(HumidityController.class);
    @Autowired
    HumidityService humidityService;
    @Autowired
    SensorService sensorService;

    @PostMapping(path = "/sensors/register")
    private Boolean registerNewSensor(
            @RequestParam String name
    ) {
        logger.info("Registering a new sensor with the name " + name);
        sensorService.registerSensor(name);
        logger.info("New sensor " + name + " registered successfully");
        return true;
    }

    @GetMapping(path = "/sensors")
    private List<String> getSensors() {
        List<String> sensorsList = new ArrayList<>();
        logger.info("Retrieving all registered sensors");
        sensorService.getAllSensorsByName().forEach(sensorEntity -> sensorsList.add(sensorEntity.getName()));
        return sensorsList;
    }

    @GetMapping(path = "/sensors/humidity")
    private Map<String, List<String>> getSensorsHumidity(
            @RequestParam List<String> sensorsIds
    ) {
        logger.info("Retrieving sensors " + sensorsIds + " humidity");
        Map<String, List<String>> sensorsDataMap = new HashMap<>();
        sensorsIds.forEach(sensor -> {
            var humidityList = new ArrayList<String>();
            // Simplify from entity to a class of only { atTime, data } and add it to a list
            humidityService.getAllSensorHumiditiesList(sensor)
                            .forEach(humidityEntity -> {
                                var simplifiedHumidity = humidityEntity.getAtTime() + "," + humidityEntity.getData();
                                humidityList.add(simplifiedHumidity);
                            });
            sensorsDataMap.put(sensor, humidityList);
        });
        logger.info("Humidity information for sensors " + sensorsIds + " was retrieved successfully");
        return sensorsDataMap;
    }

    @PostMapping(path = "/sensors/{sensorName}/")
    private Boolean sendHumidity(
            @PathVariable String sensorName,
            @RequestParam Integer humidity
    ) {
        logger.info("Saving humidity data to sensor " + sensorName);
        humidityService.saveHumidity(sensorName, humidity);
        logger.info("Humidity data saved correctly on sensor " + sensorName);
        return true;
    }
}
