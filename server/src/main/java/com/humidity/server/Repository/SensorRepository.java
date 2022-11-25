package com.humidity.server.Repository;

import com.humidity.server.Entity.SensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorRepository extends JpaRepository<SensorEntity, Integer> {
}
