package com.humidity.server.Repository;

import com.humidity.server.Entity.HumidityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HumidityRepository extends JpaRepository<HumidityEntity, Integer> {
    public List<HumidityEntity> findBySensorId(String sensorId);
}
